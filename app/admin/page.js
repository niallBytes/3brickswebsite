'use client'

// =============================================================================
// Admin dashboard \u2014 password-protected in-page auth. All API calls send the
// password as ?password=... (also accepted as X-Admin-Password header).
// Sections: Overview stats, Leads table (with filters, status update, source),
// Guide Downloads, Referrals.
// =============================================================================

import React, { useEffect, useMemo, useState } from 'react'
import { Lock, RefreshCw, LogOut, Search, Download, Users, Sparkles, Calendar, BookOpen } from 'lucide-react'
import SiteChrome from '@/components/SiteChrome'
import { AREAS } from '@/lib/content'
import Image from 'next/image'

const STATUSES = ['new', 'called', 'consultation_scheduled', 'proposal_sent', 'closed_won', 'closed_lost']
const BHKS = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK+']

function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [tab, setTab] = useState('dashboard')
  const [error, setError] = useState('')
  const [stats, setStats] = useState(null)

  // leads
  const [leads, setLeads] = useState([])
  const [leadsMeta, setLeadsMeta] = useState({ total: 0, page: 1 })
  const [filters, setFilters] = useState({ status: '', area: '', bhk: '', search: '' })
  const [expanded, setExpanded] = useState(null)

  // guides + referrals
  const [downloads, setDownloads] = useState([])
  const [referrals, setReferrals] = useState([])

  useEffect(() => {
    const p = typeof window !== 'undefined' ? sessionStorage.getItem('yf_admin') : null
    if (p) { setPassword(p); loadAll(p) }
  }, [])

  async function loadAll(pwd) {
    setError('')
    try {
      const s = await fetch(`/api/admin/stats?password=${encodeURIComponent(pwd)}`).then(r => r.json())
      if (s.error) { setError(s.error); setAuthed(false); return }
      setStats(s); setAuthed(true); sessionStorage.setItem('yf_admin', pwd)
      loadLeads(pwd, 1, filters)
      loadDownloads(pwd)
      loadReferrals(pwd)
    } catch { setError('Network error') }
  }

  async function loadLeads(pwd = password, page = 1, f = filters) {
    const q = new URLSearchParams({ password: pwd, page: String(page) })
    Object.entries(f).forEach(([k, v]) => { if (v) q.set(k, v) })
    const data = await fetch(`/api/admin/leads?${q.toString()}`).then(r => r.json())
    if (!data.error) { setLeads(data.leads || []); setLeadsMeta({ total: data.total, page: data.page, perPage: data.perPage }) }
  }

  const deleteLead = async (id) => {
  if (!confirm('Are you sure you want to delete this lead? This cannot be undone.')) {
    return
  }

  try {
    const res = await fetch(
      `/api/admin/leads/${id}?password=${encodeURIComponent(password)}`,
      {
        method: 'DELETE',
      }
    )

    const data = await res.json()

    if (!res.ok || data.error) {
      throw new Error(data.error || 'Failed to delete lead')
    }

    setLeads(prev => prev.filter(l => l.id !== id))

    if (expanded === id) {
      setExpanded(null)
    }

    setLeadsMeta(prev => ({
      ...prev,
      total: Math.max(0, prev.total - 1),
    }))

    setStats(prev =>
      prev
        ? {
            ...prev,
            total: Math.max(0, prev.total - 1),
          }
        : prev
    )
  } catch (err) {
    console.error('Delete lead error:', err)
    alert(err.message || 'Failed to delete lead. Please try again.')
  }
}

  async function loadDownloads(pwd = password) {
    const data = await fetch(`/api/admin/guide-downloads?password=${encodeURIComponent(pwd)}`).then(r => r.json())
    if (!data.error) setDownloads(data.downloads || [])
  }
  async function loadReferrals(pwd = password) {
    const data = await fetch(`/api/admin/referrals?password=${encodeURIComponent(pwd)}`).then(r => r.json())
    if (!data.error) setReferrals(data.referrals || [])
  }

  async function updateStatus(id, status) {
    await fetch(`/api/admin/leads/${id}?password=${encodeURIComponent(password)}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    loadLeads()
  }

  async function markLeadAsRead(id) {
  try {
    const res = await fetch(
      `/api/admin/leads/${id}/read?password=${encodeURIComponent(password)}`,
      {
        method: 'POST',
      }
    )

    const data = await res.json()

    if (!res.ok || data.error) {
      console.error('Failed to mark lead as read:', data.error)
      return
    }

    // Update the lead locally immediately
    setLeads(prev =>
      prev.map(lead =>
        lead.id === id ? { ...lead, read: true } : lead
      )
    )

    // Update dashboard unread count
    setStats(prev =>
      prev
        ? {
            ...prev,
            newLeads: Math.max(0, (prev.newLeads || 0) - 1),
          }
        : prev
    )
  } catch (err) {
    console.error('Failed to mark lead as read:', err)
  }
}

  function exportCsv() {
    const rows = [
      ['Date', 'Name', 'Phone', 'Email', 'Area', 'BHK', 'Budget', 'Source', 'Status', 'Est Min', 'Est Max'],
      ...leads.map(l => [
        new Date(l.created_at).toLocaleString('en-IN'),
        l.name, l.phone, l.email, l.area, l.bhk_type, l.budget_range,
        l.source, l.status, l.estimated_range_min, l.estimated_range_max,
      ]),
    ]
    const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `leads-${Date.now()}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  // ---- Auth screen ----
  if (!authed) {
    return (
      <SiteChrome>
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <form onSubmit={(e) => { e.preventDefault(); loadAll(password) }} className="w-full max-w-sm bg-white rounded-lg p-8 shadow-xl border border-black/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#F47B20] text-white flex items-center justify-center"><Lock className="h-5 w-5" /></div>
            <div><div className="font-serif-display text-2xl">3 Bricks Admin</div><div className="text-xs text-black/50">Dashboard access</div></div>
          </div>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-black/15 rounded-md px-4 py-3 focus:border-[#F47B20] focus:outline-none" autoFocus />
          {error && <div className="text-sm text-red-600 mt-3">{error}</div>}
          <button className="mt-4 w-full bg-[#F47B20] hover:bg-[#D9631A] text-white rounded-full py-3">Sign In</button>
          <p className="text-xs text-black/40 mt-4 text-center">Change the password anytime in <code>.env</code> \u2192 <code>ADMIN_PASSWORD</code>.</p>
        </form>
      </div>
      </SiteChrome>
    )
  }

  return (
    <SiteChrome>
    <div className="min-h-screen bg-cream text-[#1E1E1E]">
      <header className="bg-white border-b border-black/5 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-serif-display text-2xl"><Image
            src="/brand/logo.png"
            alt="3 Bricks Interiors"
            width={160}
            height={10}
            className="h-21 w-auto mb-4"
          />  Admin</div>
          <div className="flex items-center gap-3">
            <button onClick={() => loadAll(password)} className="px-4 py-2 text-sm border border-black/10 rounded-full hover:border-[#F47B20] hover:text-[#F47B20] inline-flex items-center gap-2"><RefreshCw className="h-4 w-4" />Refresh</button>
            <button onClick={() => { sessionStorage.removeItem('yf_admin'); setAuthed(false); setPassword('') }} className="px-4 py-2 text-sm text-black/60 hover:text-red-600 inline-flex items-center gap-2"><LogOut className="h-4 w-4" />Sign Out</button>
          </div>
        </div>
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex gap-6 border-t border-black/5 overflow-x-auto no-scrollbar">
          {[
            ['dashboard', 'Overview'], ['leads', `Leads (${stats?.total ?? 0})`], ['guides', 'Guide Downloads'], ['referrals', 'Referrals'],
          ].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`px-1 py-3 text-sm border-b-2 whitespace-nowrap ${tab === k ? 'border-[#F47B20] text-[#F47B20]' : 'border-transparent text-black/60 hover:text-black'}`}>{l}</button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview */}
        {tab === 'dashboard' && stats && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <StatCard icon={Calendar} label="Leads this month" value={stats.month} />
              <StatCard icon={Users} label="Total leads" value={stats.total} />
              <StatCard icon={Sparkles} label="New (unread)" value={stats.newLeads} highlight />
              <StatCard icon={Calendar} label="Scheduled today" value={stats.scheduledToday} />
              <StatCard icon={BookOpen} label="Guide downloads (m)" value={stats.guidesMonth} />
            </div>

            {/* Leads by source */}
            <div className="bg-white rounded-lg border border-black/5 p-6">
              <h3 className="font-serif-display text-xl mb-4">Leads by source (this month)</h3>
              {stats.bySource.length === 0 && <div className="text-sm text-black/50">No leads yet this month.</div>}
              <div className="space-y-3">
                {stats.bySource.map(s => {
                  const max = Math.max(...stats.bySource.map(x => x.count))
                  const pct = max > 0 ? (s.count / max) * 100 : 0
                  return (
                    <div key={s.source}>
                      <div className="flex justify-between text-sm mb-1"><span className="text-black/70">{s.source}</span><span className="font-medium">{s.count}</span></div>
                      <div className="h-2 bg-black/5 rounded-full overflow-hidden"><div className="h-full bg-[#F47B20]" style={{ width: `${pct}%` }} /></div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Leads */}
        {tab === 'leads' && (
          <div>
            <div className="flex flex-wrap gap-3 mb-4 items-center">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
                <input placeholder="Search name / phone / email" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && loadLeads(password, 1, filters)}
                  className="pl-9 pr-4 py-2 border border-black/15 rounded-lg text-sm min-w-[220px]" />
              </div>
              <select value={filters.status} onChange={(e) => { const f = { ...filters, status: e.target.value }; setFilters(f); loadLeads(password, 1, f) }} className="border border-black/15 rounded-lg px-3 py-2 text-sm bg-white">
                <option value="">All statuses</option>{STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
              </select>
              <select value={filters.area} onChange={(e) => { const f = { ...filters, area: e.target.value }; setFilters(f); loadLeads(password, 1, f) }} className="border border-black/15 rounded-lg px-3 py-2 text-sm bg-white">
                <option value="">All areas</option>{AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <select value={filters.bhk} onChange={(e) => { const f = { ...filters, bhk: e.target.value }; setFilters(f); loadLeads(password, 1, f) }} className="border border-black/15 rounded-lg px-3 py-2 text-sm bg-white">
                <option value="">All BHK</option>{BHKS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <button onClick={exportCsv} className="ml-auto inline-flex items-center gap-2 border border-black/15 rounded-lg px-3 py-2 text-sm hover:border-[#F47B20] hover:text-[#F47B20]"><Download className="h-4 w-4" />Export CSV</button>
            </div>

            <div className="bg-white rounded-lg border border-black/5 overflow-hidden overflow-x-auto">
              <table className="w-full text-sm min-w-[1100px]">
                <thead className="bg-black/[0.03] text-black/60 text-xs uppercase tracking-[0.15em]">
                  <tr>
                    <th className="text-left px-4 py-3">Date</th>
                    <th className="text-left px-4 py-3">Name</th>
                    <th className="text-left px-4 py-3">Phone</th>
                    <th className="text-left px-4 py-3">Area / BHK</th>
                    <th className="text-left px-4 py-3">Budget</th>
                    <th className="text-left px-4 py-3">Consultation</th>
                    <th className="text-left px-4 py-3">Source</th>
                    <th className="text-left px-4 py-3">Referral</th>
                    <th className="text-left px-4 py-3">Estimate</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 && (<tr><td colSpan="9" className="px-4 py-16 text-center text-black/40">No leads match your filter.</td></tr>)}
                  {leads.map(l => (
                    <React.Fragment key={l.id}>
                      <tr
  className={`border-t border-black/5 hover:bg-cream/40 cursor-pointer ${
    !l.read ? 'bg-[#F47B20]/[0.04]' : ''
  }`}
  onClick={() => {
    const isOpening = expanded !== l.id

    setExpanded(expanded === l.id ? null : l.id)

    if (isOpening && !l.read) {
      markLeadAsRead(l.id)
    }
  }}
>
                        <td className="px-4 py-3 whitespace-nowrap text-black/70">{new Date(l.created_at).toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 font-medium">
  <div className="flex items-center gap-2">
    {!l.read && (
      <span
        className="w-2 h-2 rounded-full bg-[#F47B20] shrink-0"
        title="Unread"
      />
    )}
    <span className={!l.read ? 'font-semibold' : ''}>
      {l.name}
    </span>
  </div>
</td>
                        <td className="px-4 py-3"><a href={`tel:${l.phone}`} onClick={e => e.stopPropagation()} className="text-[#F47B20] hover:underline">{l.phone}</a></td>
                        <td className="px-4 py-3">{l.area || '\u2014'} / {l.bhk_type || '\u2014'}</td>
                        <td className="px-4 py-3">{l.budget_range || '\u2014'}</td>
                        <td className="px-4 py-3 text-black/60">{l.preferred_date ? `${l.preferred_date} ${l.preferred_time || ''}` : '\u2014'}<div className="text-[11px] text-black/40">{l.consultation_mode || ''}</div></td>
                        <td className="px-4 py-3"><span className="text-[11px] bg-black/[0.05] rounded-full px-2 py-1">{l.source || 'unknown'}</span></td>
                        <td className="px-4 py-3">{l.referral_code ? <span className="text-[11px] bg-[#F47B20]/10 text-[#F47B20] rounded-full px-2 py-1 font-medium">{l.referral_code}</span> : <span className="text-black/30">—</span>}</td>
                        <td className="px-4 py-3 text-green-700 font-medium">{l.estimated_range_min ? `\u20b9${Math.round(l.estimated_range_min/100000)}L\u2013\u20b9${Math.round(l.estimated_range_max/100000)}L` : '\u2014'}</td>
                        <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                          <select value={l.status} onChange={(e) => updateStatus(l.id, e.target.value)} className="border border-black/15 rounded-md px-2 py-1 text-xs bg-white">
                            {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-3">
  <button
    onClick={(e) => { e.stopPropagation(); deleteLead(l.id) }}
    className="text-red-400 hover:text-red-600 transition-colors text-xs font-medium px-2 py-1 rounded hover:bg-red-50"
  >
    Delete
  </button>
</td>
                      </tr>
                      {expanded === l.id && (
                        <tr className="bg-black/[0.02] border-t border-black/5">
                          <td colSpan="9" className="px-6 py-5">
                            <div className="grid md:grid-cols-3 gap-4 text-xs">
                              <Row label="Email">{l.email || '\u2014'}</Row>
                              <Row label="Project type">{l.project_type || '\u2014'}</Row>
                              <Row label="Home type">{l.home_type || '\u2014'}</Row>
                              <Row label="Pincode">{l.pincode || '\u2014'}</Row>
                              <Row label="Scope items">{(l.scope_items || []).join(', ') || '\u2014'}</Row>
                              <Row label="Possession">{l.possession_timeline || '\u2014'}</Row>
                              <Row label="Language">{l.preferred_language || '\u2014'}</Row>
                              <Row label="Floor plan">{l.has_floor_plan ? 'Yes' : 'No'}</Row>
                              <Row label="Package interest">{l.package_interest || '\u2014'}</Row>
                              <Row label="Page URL">{l.page_url || '\u2014'}</Row>
                              <Row label="Referral">{l.referral_code || '\u2014'}</Row>
                              <Row label="Package tier">{l.package_tier || '\u2014'}</Row>
                              {l.referral_code && (
  <div className="col-span-3 mt-3 pt-3 border-t border-black/5 flex items-center justify-between">
    <div className="text-xs">
      <span className="text-black/40 uppercase tracking-wider">Referred by: </span>
      <span className="font-medium text-[#F47B20]">{l.referral_code}</span>
    </div>
    <button
      onClick={async () => {
        await fetch(`/api/referrals/${l.referral_code}/reward?password=${encodeURIComponent(password)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lead_id: l.id })
        })
        alert('Referral marked as rewarded! Remember to send the Amazon voucher to the referrer.')
        loadLeads()
      }}
      className="text-xs bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition-colors"
    >
      Mark Project Started — Trigger Reward
    </button>
  </div>
)}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {leadsMeta.total > (leadsMeta.perPage || 20) && (
              <div className="flex items-center justify-between mt-4 text-sm">
                <div className="text-black/50">Page {leadsMeta.page} \u00b7 {leadsMeta.total} total</div>
                <div className="flex gap-2">
                  <button disabled={leadsMeta.page <= 1} onClick={() => loadLeads(password, leadsMeta.page - 1, filters)} className="border border-black/15 rounded-lg px-3 py-1 disabled:opacity-40">Prev</button>
                  <button disabled={leadsMeta.page * (leadsMeta.perPage || 20) >= leadsMeta.total} onClick={() => loadLeads(password, leadsMeta.page + 1, filters)} className="border border-black/15 rounded-lg px-3 py-1 disabled:opacity-40">Next</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Guides */}
        {tab === 'guides' && (
          <SimpleTable
            title={`Guide Downloads (${downloads.length})`}
            columns={['Date', 'Name', 'Phone', 'Email']}
            rows={downloads.map(d => [new Date(d.created_at).toLocaleString('en-IN'), d.name, d.phone, d.email || '\u2014'])}
          />
        )}

        {/* Referrals */}
        {tab === 'referrals' && (
          <SimpleTable
            title={`Referral Links (${referrals.length})`}
            columns={['Date', 'Name', 'Phone', 'Code', 'Clicks', 'Conversions']}
            rows={referrals.map(r => [
              new Date(r.created_at).toLocaleString('en-IN'),
              r.referrer_name, r.referrer_phone, r.unique_code, r.clicks, r.conversions,
            ])}
          />
        )}
      </main>
    </div>
    </SiteChrome>
  )
}

function StatCard({ icon: Icon, label, value, highlight }) {
  return (
    <div className={`rounded-lg border ${highlight ? 'border-[#F47B20] bg-[#F47B20]/5' : 'border-black/5 bg-white'} p-5`}>
      <div className="flex items-center justify-between">
        <div className="text-xs text-black/50">{label}</div>
        <Icon className={`h-4 w-4 ${highlight ? 'text-[#F47B20]' : 'text-black/40'}`} />
      </div>
      <div className={`font-serif-display text-4xl mt-2 ${highlight ? 'text-[#F47B20]' : ''}`}>{value}</div>
    </div>
  )
}

function Row({ label, children }) {
  return (
    <div className="flex flex-col">
      <span className="text-black/40 uppercase tracking-wider text-[10px]">{label}</span>
      <span className="text-black/80 mt-0.5">{children}</span>
    </div>
  )
}

function SimpleTable({ title, columns, rows }) {
  return (
    <div>
      <h2 className="font-serif-display text-2xl mb-4">{title}</h2>
      <div className="bg-white rounded-lg border border-black/5 overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-black/[0.03] text-black/60 text-xs uppercase tracking-[0.15em]">
            <tr>{columns.map(c => <th key={c} className="text-left px-4 py-3">{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.length === 0 && (<tr><td colSpan={columns.length} className="px-4 py-16 text-center text-black/40">Nothing yet.</td></tr>)}
            {rows.map((r, i) => (<tr key={i} className="border-t border-black/5">{r.map((c, j) => <td key={j} className="px-4 py-3">{c}</td>)}</tr>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPage
