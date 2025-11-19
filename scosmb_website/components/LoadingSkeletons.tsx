'use client';

export function FormSkeleton() {
  return (
    <div className="form-container space-y-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="h-12 bg-gray-300 rounded-lg w-32"></div>
    </div>
  );
}

export function DocSkeleton() {
  return (
    <div className="docs-container space-y-8 animate-pulse">
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 rounded w-48"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
}

export function FAQSkeleton() {
  return (
    <div className="faq-accordion space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}

export function PricingCardSkeleton() {
  return (
    <div className="pricing-card bg-white rounded-2xl border border-gray-200 p-8 animate-pulse">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded flex-1"></div>
            </div>
          ))}
        </div>
        <div className="h-12 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}

export function DownloadSkeleton() {
  return (
    <div className="download-section space-y-8 animate-pulse">
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-64"></div>
        <div className="h-4 bg-gray-200 rounded w-96"></div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded"></div>
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div className="h-12 bg-gray-200 rounded-lg w-40"></div>
      </div>
    </div>
  );
}

export function ReleaseNotesSkeleton() {
  return (
    <div className="release-notes space-y-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-40"></div>
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
        ))}
      </div>
    </div>
  );
}