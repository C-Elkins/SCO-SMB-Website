export default function TestAnimationsPage() {
  // This page only exists in development
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400">This page is only available in development mode.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">🧪 Animation Test Lab</h1>
          <p className="text-xl text-gray-300 mb-2">Development Mode Only</p>
          <p className="text-gray-400">Ready for new animation ideas!</p>
        </div>

        <div className="grid gap-12">
          {/* Blank Canvas for New Ideas */}
          <section className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700">
            <div className="text-center text-gray-400">
              <div className="w-24 h-24 mx-auto mb-6 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-3xl">💡</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Blank Canvas</h2>
              <p className="text-lg mb-6">Space ready for your next animation idea</p>
              <div className="text-sm text-gray-500">
                Add your components and animations here when you're ready to test them!
              </div>
            </div>
          </section>
        </div>

        {/* Development Info */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
            <p className="text-yellow-300 font-semibold">⚠️ DEVELOPMENT MODE ONLY</p>
            <p className="text-yellow-200 text-sm mt-1">
              This page is excluded from production builds and will return 404 in production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}