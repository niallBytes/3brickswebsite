import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

function cors(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 200 }))
}

function getIP(request) {
  const xf = request.headers.get('x-forwarded-for')
  if (xf) return xf.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

async function handleRoute(request, { params }) {
  const { path = [] } = await params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    if (route === '/' && method === 'GET') {
      return cors(NextResponse.json({ message: 'You First API' }))
    }

    // POST /api/leads
    if (route === '/leads' && method === 'POST') {
      const body = await request.json().catch(() => ({}))
      // Honeypot
      if (body.website && body.website.trim() !== '') {
        // Silent success against bots
        return cors(NextResponse.json({ ok: true }))
      }
      const { name, phone, project_type, area, budget } = body
      if (!name || !phone || !project_type || !area || !budget) {
        return cors(NextResponse.json({ error: 'Missing required fields' }, { status: 400 }))
      }
      if (!/^[0-9+\-\s]{8,15}$/.test(String(phone))) {
        return cors(NextResponse.json({ error: 'Invalid phone number' }, { status: 400 }))
      }

      const ip = getIP(request)
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
      const recent = await db.collection('leads').countDocuments({ ip, created_at: { $gte: oneHourAgo } })
      if (recent >= 3) {
        return cors(NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 }))
      }

      const lead = {
        id: uuidv4(),
        name: String(name).slice(0, 120),
        phone: String(phone).slice(0, 20),
        project_type: String(project_type).slice(0, 60),
        area: String(area).slice(0, 60),
        budget: String(budget).slice(0, 60),
        ip,
        user_agent: request.headers.get('user-agent') || '',
        created_at: new Date(),
      }
      await db.collection('leads').insertOne(lead)
      // eslint-disable-next-line no-unused-vars
      const { _id, ...clean } = lead
      return cors(NextResponse.json({ ok: true, lead: { ...clean, ip: undefined, user_agent: undefined } }))
    }

    // GET /api/admin/leads?password=...
    if (route === '/admin/leads' && method === 'GET') {
      const url = new URL(request.url)
      const password = url.searchParams.get('password') || request.headers.get('x-admin-password')
      if (!password || password !== process.env.ADMIN_PASSWORD) {
        return cors(NextResponse.json({ error: 'Unauthorized' }, { status: 401 }))
      }
      const leads = await db.collection('leads').find({}).sort({ created_at: -1 }).limit(1000).toArray()
      const cleaned = leads.map(({ _id, ...rest }) => rest)
      return cors(NextResponse.json({ leads: cleaned }))
    }

    return cors(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }))
  } catch (error) {
    console.error('API Error:', error)
    return cors(NextResponse.json({ error: 'Internal server error' }, { status: 500 }))
  }
}

export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
