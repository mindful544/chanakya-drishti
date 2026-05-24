export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Chanakya Drishti</h1>
        <p className="text-slate-400 mb-8">Assam Political Intelligence Dashboard – Live</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-sm text-slate-400 mb-1">Active Constituencies</h2>
            <p className="text-3xl font-bold">126</p>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-sm text-slate-400 mb-1">Leaders Tracked</h2>
            <p className="text-3xl font-bold">342</p>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-sm text-slate-400 mb-1">Sentiment Score</h2>
            <p className="text-3xl font-bold text-emerald-400">+62</p>
          </div>
        </div>

        <div className="mt-8 bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold mb-4">Deploy Success</h2>
          <p className="text-slate-300">Your dashboard is live. Next we will connect Supabase for real data.</p>
        </div>
      </div>
    </main>
  );
}
