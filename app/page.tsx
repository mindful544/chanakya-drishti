'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [stats, setStats] = useState({ constituencies:0, candidates:0, polls:0 })
  const [sentiment, setSentiment] = useState<any[]>([])
  const [topPolls, setTopPolls] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const [{count: c1}, {count: c2}, {count: c3}] = await Promise.all([
        supabase.from('constituencies').select('*', { count:'exact', head:true }),
        supabase.from('candidates').select('*', { count:'exact', head:true }),
        supabase.from('polls').select('*', { count:'exact', head:true })
      ])
      setStats({ constituencies: c1||0, candidates: c2||0, polls: c3||0 })

      const { data: s } = await supabase.from('sentiment').select('*').order('updated_at', { ascending:false }).limit(4)
      setSentiment(s || [])

      const { data: p } = await supabase.from('polls')
        .select('vote_share, constituencies(name), parties(name, short_code, color)')
        .order('vote_share', { ascending:false }).limit(5)
      setTopPolls(p || [])
    }
    load()
  }, [])

  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-800 sticky top-0 backdrop-blur bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 grid place-items-center font-bold">CD</div>
            <div>
              <h1 className="font-semibold leading-tight">Chanakya Drishti</h1>
              <p className="text-xs text-slate-400 -mt-0.5">Assam Political Intelligence</p>
            </div>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Live • Supabase</span>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-4">
          <Stat label="Constituencies Tracked" value={stats.constituencies} />
          <Stat label="Candidates Profiled" value={stats.candidates} />
          <Stat label="Polls Ingested" value={stats.polls} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <h2 className="font-semibold mb-4">Top Vote Share • Latest Polls</h2>
            <div className="space-y-3">
              {topPolls.map((r,i)=>(
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <div className="font-medium">{r.constituencies?.name}</div>
                    <div className="text-xs text-slate-400">{r.parties?.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold" style={{color:r.parties?.color}}>{r.vote_share}%</div>
                    <div className="text-xs text-slate-500">{r.parties?.short_code}</div>
                  </div>
                </div>
              ))}
              {topPolls.length===0 && <div className="text-slate-500 text-sm">No polls yet</div>}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
            <h2 className="font-semibold mb-4">Public Sentiment</h2>
            <div className="space-y-4">
              {sentiment.map(s=>(
                <div key={s.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{s.topic}</span>
                    <span className="text-emerald-400">{s.positive}% +</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden flex">
                    <div className="bg-emerald-500" style={{width:`${s.positive}%`}}/>
                    <div className="bg-rose-500" style={{width:`${s.negative}%`}}/>
                    <div className="bg-slate-600" style={{width:`${s.neutral}%`}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function Stat({label, value}:{label:string, value:number}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-5">
      <div className="text-slate-400 text-sm">{label}</div>
      <div className="text-3xl font-semibold mt-1">{value}</div>
    </div>
  )
}
