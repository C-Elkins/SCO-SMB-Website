export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#153B6B] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <a
          href="/"
          className="inline-block bg-[#00A8B5] text-white px-6 py-3 rounded-lg hover:bg-[#008c97] transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
