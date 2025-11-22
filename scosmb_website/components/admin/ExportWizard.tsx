'use client';

import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileJson, Calendar } from 'lucide-react';

interface ExportWizardProps {
  type: 'keys' | 'customers' | 'analytics';
  onExport: (format: string, dateRange?: { start: string; end: string }) => void;
}

export function ExportWizard({ type, onExport }: ExportWizardProps) {
  const [format, setFormat] = useState<'csv' | 'excel' | 'json' | 'pdf'>('csv');
  const [showModal, setShowModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const handleExport = () => {
    onExport(format, dateRange);
    setShowModal(false);
  };

  const formats = [
    { id: 'csv' as const, name: 'CSV', icon: FileText, description: 'Comma-separated values' },
    { id: 'excel' as const, name: 'Excel', icon: FileSpreadsheet, description: 'Microsoft Excel format' },
    { id: 'json' as const, name: 'JSON', icon: FileJson, description: 'JavaScript Object Notation' },
    { id: 'pdf' as const, name: 'PDF', icon: FileText, description: 'Printable report' },
  ];

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
      >
        <Download className="w-4 h-4" />
        Advanced Export
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#153B6B] to-[#00A8B5] text-white p-6">
              <h2 className="text-2xl font-bold mb-2">Export {type}</h2>
              <p className="text-white/80">Choose format and date range for your export</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Format Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Export Format
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {formats.map(({ id, name, icon: Icon, description }) => (
                    <button
                      key={id}
                      onClick={() => setFormat(id)}
                      className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                        format === id
                          ? 'border-[#00A8B5] bg-[#00A8B5]/10 shadow-md'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${
                        format === id ? 'text-[#00A8B5]' : 'text-gray-400'
                      }`} />
                      <div className="text-sm font-semibold text-gray-900">{name}</div>
                      <div className="text-xs text-gray-500 mt-1">{description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date Range
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">End Date</label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Date Presets */}
              <div>
                <label className="block text-xs text-gray-600 mb-2">Quick Select</label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { label: 'Last 7 days', days: 7 },
                    { label: 'Last 30 days', days: 30 },
                    { label: 'Last 90 days', days: 90 },
                    { label: 'This year', days: 365 },
                  ].map(({ label, days }) => (
                    <button
                      key={label}
                      onClick={() => setDateRange({
                        start: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        end: new Date().toISOString().split('T')[0]
                      })}
                      className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Export Preview */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-[#153B6B] mb-2">Export Summary</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Format: <span className="font-medium">{format.toUpperCase()}</span></li>
                  <li>• Date Range: <span className="font-medium">{dateRange.start} to {dateRange.end}</span></li>
                  <li>• Type: <span className="font-medium capitalize">{type}</span></li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                className="px-6 py-2.5 bg-gradient-to-r from-[#00A8B5] to-[#153B6B] text-white rounded-lg hover:shadow-lg font-medium transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
