'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface StatusData {
  crashFreeRate: string;
  last24Hours: {
    totalErrors: number;
  };
}

export function StatusBadge() {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/sentry-stats')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(true);
        } else {
          setStatus(data);
        }
      })
      .catch(() => setError(true));
  }, []);

  if (error || !status) return null;

  const crashFree = parseFloat(status.crashFreeRate);
  const statusType = crashFree >= 99 
    ? 'operational' 
    : crashFree >= 95 
    ? 'degraded' 
    : 'down';

  const colorClasses = {
    operational: 'bg-green-50 text-green-700 border-green-200',
    degraded: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    down: 'bg-red-50 text-red-700 border-red-200'
  };

  const dotColors = {
    operational: 'bg-green-500',
    degraded: 'bg-yellow-500',
    down: 'bg-red-500'
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${colorClasses[statusType]}`}>
      <div className={`w-2 h-2 rounded-full ${dotColors[statusType]} animate-pulse`} />
      <span>{status.crashFreeRate} Stable</span>
    </div>
  );
}
