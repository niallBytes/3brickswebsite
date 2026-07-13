// =============================================================================
// You First — Catch-all API route
// Endpoints:
//   GET  /api/                          — health check
//   POST /api/leads                     — create a lead (quiz or inline form)
//   POST /api/guide-downloads           — free-guide capture
//   POST /api/referrals                 — create a referral link
//   GET  /api/referrals/[code]/click    — track a referral click
//   GET  /api/admin/stats               — dashboard summary (protected)
//   GET  /api/admin/leads               — list leads with filters (protected)
//   GET  /api/admin/guide-downloads     — list guide downloads (protected)
//   GET  /api/admin/referrals           — list referrals (protected)
//   PATCH /api/admin/leads/[id]         — update lead status/notes (protected)
// =============================================================================

import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

let client, db
async function getDb() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

// Apply permissive CORS — API is only called from same domain but keep flexible
function cors(res) {
  res.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Password')
  return res
}

export async function OPTIONS() { return cors(new NextResponse(null, { status: 200 })) }

// Extract client IP for rate limiting
function getIP(req) {
  const xf = req.headers.get('x-forwarded-for')
  if (xf) return xf.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

// Check admin password (query param OR header)
function isAdmin(req, url) {
  const p = url.searchParams.get('password') || req.headers.get('x-admin-password')
  return p && p === process.env.ADMIN_PASSWORD
}

// Recompute estimate server-side to prevent client tampering
import { calculateEstimate } from '@/lib/quiz'

async function handle(req, { params }) {
  const { path = [] } = await params
  const route = '/' + path.join('/')
  const method = req.method
  const url = new URL(req.url)

  try {
    const db = await getDb()

    // ---------- Health ----------
    if (route === '/' && method === 'GET') {
      return cors(NextResponse.json({ message: 'You First API', ok: true }))
    }

    // ---------- Create lead (quiz + all inline forms) ----------
    if (route === '/leads' && method === 'POST') {
      const body = await req.json().catch(() => ({}))

      // Honeypot — bots fill hidden `website` field, silently “succeed”
      if (body.website && String(body.website).trim() !== '') {
        return cors(NextResponse.json({ ok: true }))
      }

      // Required minimal fields for ANY lead
      const { name, phone } = body
      if (!name || !phone) return cors(NextResponse.json({ error: 'Missing name or phone' }, { status: 400 }))
      if (!/^\+?[0-9\-\s]{8,15}$/.test(String(phone))) {
        return cors(NextResponse.json({ error: 'Invalid phone number' }, { status: 400 }))
      }

      // IP-based rate limit: 5 submissions / hour / IP (higher than earlier since we have many forms)
      const ip = getIP(req)
      const hourAgo = new Date(Date.now() - 60 * 60 * 1000)
      const recent = await db.collection('leads').countDocuments({ ip, created_at: { $gte: hourAgo } })
      if (recent >= 5) {
        return cors(NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 }))
      }

      // Compute estimate if quiz payload is complete
      let est = null
      if (body.bhk_type && body.budget_range) {
        est = calculateEstimate(body)
      }

      // Build lead document — store everything, unknown fields go into `extra`
      const now = new Date()
      const lead = {
        id: uuidv4(),
        name: String(name).slice(0, 120),
        phone: String(phone).slice(0, 20),
        email: body.email ? String(body.email).slice(0, 200) : '',
        area: body.area ? String(body.area).slice(0, 80) : '',
        pincode: body.pincode ? String(body.pincode).slice(0, 10) : '',
        project_type: body.project_type || '',
        home_type: body.home_type || '',
        bhk_type: body.bhk_type || '',
        scope_items: Array.isArray(body.scope_items) ? body.scope_items : [],
        budget_range: body.budget_range || '',
        possession_timeline: body.possession_timeline || '',
        has_floor_plan: !!body.has_floor_plan,
        floor_plan_url: body.floor_plan_url || '',
        preferred_language: body.preferred_language || '',
        consultation_mode: body.consultation_mode || '',
        preferred_date: body.preferred_date || '',
        preferred_time: body.preferred_time || '',
        estimated_range_min: est ? est.min : null,
        estimated_range_max: est ? est.max : null,
        package_tier: est ? est.packageTier : '',
        source: body.source || 'unknown',
        package_interest: body.package_interest || '',
        page_url: body.page_url || '',
        referral_code: body.referral_code || '',
        status: 'new',
        notes: '',
        ip,
        user_agent: req.headers.get('user-agent') || '',
        created_at: now,
      }
      await db.collection('leads').insertOne(lead)

      // If lead came via a referral link, bump conversion count
      if (body.referral_code) {
        await db.collection('referrals').updateOne(
          { unique_code: body.referral_code },
          { $inc: { conversions: 1 } }
        )
      }

      const { _id, ip: _ip, user_agent: _ua, ...clean } = lead
      return cors(NextResponse.json({ ok: true, lead: clean, estimate: est }))
    }

    // ---------- Guide downloads ----------
    if (route === '/guide-downloads' && method === 'POST') {
      const body = await req.json().catch(() => ({}))
      if (body.website && String(body.website).trim() !== '') return cors(NextResponse.json({ ok: true }))
      const { name, phone } = body
      if (!name || !phone) return cors(NextResponse.json({ error: 'Missing name or phone' }, { status: 400 }))
      const doc = {
        id: uuidv4(),
        name: String(name).slice(0, 120),
        phone: String(phone).slice(0, 20),
        email: body.email ? String(body.email).slice(0, 200) : '',
        ip: getIP(req),
        created_at: new Date(),
      }
      await db.collection('guide_downloads').insertOne(doc)
      const { _id, ip: _ip, ...clean } = doc
      return cors(NextResponse.json({ ok: true, download: clean }))
    }

    // ---------- Create referral ----------
    if (route === '/referrals' && method === 'POST') {
      const body = await req.json().catch(() => ({}))
      const { referrer_name, referrer_phone } = body
      if (!referrer_name || !referrer_phone) {
        return cors(NextResponse.json({ error: 'Missing name or phone' }, { status: 400 }))
      }
      // Generate a short unique code from name + random
      const namePart = String(referrer_name).replace(/[^A-Za-z]/g, '').slice(0, 8).toUpperCase() || 'YF'
      const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
      const unique_code = `${namePart}${rand}`
      const doc = {
        id: uuidv4(),
        referrer_name: String(referrer_name).slice(0, 120),
        referrer_phone: String(referrer_phone).slice(0, 20),
        unique_code,
        clicks: 0,
        conversions: 0,
        created_at: new Date(),
      }
      await db.collection('referrals').insertOne(doc)
      const { _id, ...clean } = doc
      return cors(NextResponse.json({ ok: true, referral: clean }))
    }

    // ---------- Track referral click ----------
    if (route.startsWith('/referrals/') && route.endsWith('/click') && method === 'POST') {
      const code = path[1]
      if (!code) return cors(NextResponse.json({ error: 'code required' }, { status: 400 }))
      const ref = await db.collection('referrals').findOneAndUpdate(
        { unique_code: code },
        { $inc: { clicks: 1 } },
        { returnDocument: 'after' }
      )
      if (!ref || (!ref.value && !ref._id)) {
        return cors(NextResponse.json({ ok: false }, { status: 404 }))
      }
      const val = ref.value || ref
      return cors(NextResponse.json({ ok: true, referrer_name: val.referrer_name || '' }))
    }

    // ---------- Admin: stats ----------
    if (route === '/admin/stats' && method === 'GET') {
      if (!isAdmin(req, url)) return cors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const start = new Date(); start.setDate(1); start.setHours(0, 0, 0, 0)
      const dayStart = new Date(); dayStart.setHours(0, 0, 0, 0)
      const dayEnd = new Date(); dayEnd.setHours(23, 59, 59, 999)
      const [total, month, newLeads, guides, sourceAgg] = await Promise.all([
        db.collection('leads').countDocuments({}),
        db.collection('leads').countDocuments({ created_at: { $gte: start } }),
        db.collection('leads').countDocuments({ status: 'new' }),
        db.collection('guide_downloads').countDocuments({ created_at: { $gte: start } }),
        db.collection('leads').aggregate([
          { $match: { created_at: { $gte: start } } },
          { $group: { _id: '$source', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]).toArray(),
      ])
      const scheduledToday = await db.collection('leads').countDocuments({
        preferred_date: { $regex: `^${new Date().toISOString().slice(0,10)}` },
      })
      return cors(NextResponse.json({
        total, month, newLeads, guidesMonth: guides, scheduledToday,
        bySource: sourceAgg.map(s => ({ source: s._id || 'unknown', count: s.count })),
      }))
    }

    // ---------- Admin: list leads ----------
    if (route === '/admin/leads' && method === 'GET') {
      if (!isAdmin(req, url)) return cors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const q = {}
      const status = url.searchParams.get('status'); if (status) q.status = status
      const area = url.searchParams.get('area'); if (area) q.area = area
      const bhk = url.searchParams.get('bhk'); if (bhk) q.bhk_type = bhk
      const search = url.searchParams.get('search')
      if (search) {
        q.$or = [
          { name: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ]
      }
      const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10))
      const perPage = 20
      const total = await db.collection('leads').countDocuments(q)
      const leads = await db.collection('leads').find(q)
        .sort({ created_at: -1 })
        .skip((page - 1) * perPage).limit(perPage).toArray()
      const cleaned = leads.map(({ _id, ...rest }) => rest)
      return cors(NextResponse.json({ leads: cleaned, total, page, perPage }))
    }

    // ---------- Admin: update lead ----------
    if (route.startsWith('/admin/leads/') && (method === 'PATCH' || method === 'PUT')) {
      if (!isAdmin(req, url)) return cors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const id = path[2]
      const body = await req.json().catch(() => ({}))
      const update = {}
      if (body.status) update.status = String(body.status)
      if (body.notes !== undefined) update.notes = String(body.notes)
      if (!Object.keys(update).length) return cors(NextResponse.json({ error: 'nothing to update' }, { status: 400 }))
      await db.collection('leads').updateOne({ id }, { $set: update })
      return cors(NextResponse.json({ ok: true }))
    }

    // ---------- Admin: guide downloads ----------
    if (route === '/admin/guide-downloads' && method === 'GET') {
      if (!isAdmin(req, url)) return cors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const list = await db.collection('guide_downloads').find({}).sort({ created_at: -1 }).limit(1000).toArray()
      return cors(NextResponse.json({ downloads: list.map(({ _id, ...r }) => r) }))
    }

    // ---------- Admin: referrals ----------
    if (route === '/admin/referrals' && method === 'GET') {
      if (!isAdmin(req, url)) return cors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      const list = await db.collection('referrals').find({}).sort({ created_at: -1 }).limit(1000).toArray()
      return cors(NextResponse.json({ referrals: list.map(({ _id, ...r }) => r) }))
    }

    return cors(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }))
  } catch (err) {
    console.error('API error:', err)
    return cors(NextResponse.json({ error: 'Internal server error' }, { status: 500 }))
  }
}

export const GET = handle
export const POST = handle
export const PUT = handle
export const DELETE = handle
export const PATCH = handle
