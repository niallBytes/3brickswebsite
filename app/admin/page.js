'use client'

import { useEffect, useState } from 'react'
import { Lock, RefreshCw, LogOut } from 'lucide-react'

function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [leads, setLeads] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const p = typeof window !== 'undefined' ? sessionStorage.getItem('yf_admin') : null
    if (p) { setPassword(p); load(p) }
  }, [])

  const load = async (pwd) => {
    setLoading(true); setError('')
    try {
      const res = await fetch(`/api/admin/leads?password=${encodeURIComponent(pwd)}`)
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed'); setAuthed(false); return }
      setLeads(data.leads || [])
      setAuthed(true)
      sessionStorage.setItem('yf_admin', pwd)
    } catch {
      setError('Network error')
    } finally { setLoading(false) }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <form onSubmit={(e) => { e.preventDefault(); load(password) }} className="w-full max-w-sm bg-white rounded-lg p-8 shadow-xl border border-black/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#F47B20] text-white flex items-center justify-center"><Lock className="h-5 w-5" /></div>
            <div>
              <div className="font-serif-display text-2xl">You First Admin</div>
              <div className="text-xs text-black/50">Leads dashboard</div>
            </div>
          </div>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-black/15 rounded-md px-4 py-3 focus:border-[#F47B20] focus:outline-none" autoFocus />
          {error && <div className="text-sm text-red-600 mt-3">{error}</div>}
          <button className="mt-4 w-full bg-[#F47B20] hover:bg-[#D9631A] text-white rounded-full py-3">{loading ? 'Checking…' : 'Sign In'}</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-black/5 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-serif-display text-2xl"><span>YOU</span><span className="text-[#F47B20] italic">FIRST</span> · Admin</div>
          <div className="flex items-center gap-3">
            <button onClick={() => load(password)} className="px-4 py-2 text-sm border border-black/10 rounded-full hover:border-[#F47B20] hover:text-[#F47B20] inline-flex items-center gap-2"><RefreshCw className="h-4 w-4" />Refresh</button>
            <button onClick={() => { sessionStorage.removeItem('yf_admin'); setAuthed(false); setPassword('') }} className="px-4 py-2 text-sm text-black/60 hover:text-red-600 inline-flex items-center gap-2"><LogOut className="h-4 w-4" />Sign Out</button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-baseline justify-between mb-8">
          <h1 className="font-serif-display text-4xl">Leads <span className="text-[#F47B20] italic">({leads.length})</span></h1>
          <div className="text-xs text-black/50">Sorted newest first</div>
        </div>
        <div className="bg-white rounded-lg border border-black/5 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-black/[0.03] text-black/60 text-xs uppercase tracking-[0.15em]">
              <tr>
                <th className="text-left px-6 py-4">Date</th>
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Phone</th>
                <th className="text-left px-6 py-4">Project</th>
                <th className="text-left px-6 py-4">Area</th>
                <th className="text-left px-6 py-4">Budget</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && (
                <tr><td colSpan="6" className="px-6 py-16 text-center text-black/40">No leads yet.</td></tr>
              )}
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-black/5 hover:bg-cream/50">
                  <td className="px-6 py-4 text-black/60 whitespace-nowrap">{new Date(l.created_at).toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 font-medium">{l.name}</td>
                  <td className="px-6 py-4"><a href={`tel:${l.phone}`} className="text-[#F47B20] hover:underline">{l.phone}</a></td>
                  <td className="px-6 py-4">{l.project_type}</td>
                  <td className="px-6 py-4">{l.area}</td>
                  <td className="px-6 py-4">{l.budget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default AdminPage
