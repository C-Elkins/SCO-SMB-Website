'use client';

import React, { useState } from 'react';
import { FileType, Copy, CheckCircle, RefreshCw, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export function FileNamingGenerator() {
  const [prefix, setPrefix] = useState('DOC');
  const [includeDate, setIncludeDate] = useState(true);
  const [includeTime, setIncludeTime] = useState(false);
  const [separator, setSeparator] = useState('_');
  const [counter, setCounter] = useState(1);
  const [copied, setCopied] = useState(false);

  const generateExample = () => {
    const parts = [prefix];
    
    if (includeDate) {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      parts.push(`${year}${month}${day}`);
    }
    
    if (includeTime) {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      parts.push(`${hours}${minutes}${seconds}`);
    }
    
    parts.push(String(counter).padStart(4, '0'));
    
    return parts.join(separator) + '.pdf';
  };

  const exampleFilename = generateExample();

  const copyToClipboard = () => {
    const pattern = `${prefix}${separator}${includeDate ? 'YYYYMMDD' : ''}${includeDate && includeTime ? separator : ''}${includeTime ? 'HHMMSS' : ''}${separator}####`;
    navigator.clipboard.writeText(pattern);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { name: 'Standard', prefix: 'DOC', date: true, time: false, sep: '_' },
    { name: 'Timestamped', prefix: 'SCAN', date: true, time: true, sep: '-' },
    { name: 'Simple', prefix: 'FILE', date: false, time: false, sep: '_' },
    { name: 'Invoice', prefix: 'INV', date: true, time: false, sep: '_' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden hover-lift card-depth group">
      <div className="bg-linear-to-br from-[#153B6B] via-[#1e4a7f] to-[#00A8B5] p-10 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10 flex items-center gap-4 mb-2">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileType className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">File Naming Pattern Generator</h2>
            <p className="text-white/90 text-sm mt-1">Create consistent naming conventions</p>
          </div>
        </div>
      </div>

      <div className="p-12">
        <p className="text-gray-600 mb-8 text-center leading-relaxed">
          Design a file naming pattern for your scanned documents. SCO SMB automatically applies your naming rules.
        </p>

        {/* Quick Presets */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Presets</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {presets.map((preset) => (
              <motion.button
                key={preset.name}
                onClick={() => {
                  setPrefix(preset.prefix);
                  setIncludeDate(preset.date);
                  setIncludeTime(preset.time);
                  setSeparator(preset.sep);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 bg-[#00A8B5]/10 border border-[#00A8B5]/30 rounded-xl text-sm font-medium text-gray-700 hover:bg-[#00A8B5]/20 transition-colors"
              >
                {preset.name}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="space-y-6 mb-8">
          {/* Prefix */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#00A8B5]" />
              File Prefix
            </label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
              maxLength={10}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00A8B5] focus:outline-none text-lg font-mono"
              placeholder="DOC"
            />
          </div>

          {/* Separator */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Separator Character</label>
            <div className="grid grid-cols-3 gap-3">
              {['_', '-', '.'].map((sep) => (
                <button
                  key={sep}
                  onClick={() => setSeparator(sep)}
                  className={`px-4 py-3 rounded-xl font-mono text-xl transition-all ${
                    separator === sep
                      ? 'bg-[#00A8B5] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {sep === '_' ? 'Underscore _' : sep === '-' ? 'Dash -' : 'Dot .'}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Include Components</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={includeDate}
                  onChange={(e) => setIncludeDate(e.target.checked)}
                  className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                />
                <div className="flex-1">
                  <span className="font-medium text-gray-900">Date (YYYYMMDD)</span>
                  <p className="text-xs text-gray-500">e.g., 20241203</p>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={includeTime}
                  onChange={(e) => setIncludeTime(e.target.checked)}
                  className="w-5 h-5 text-[#00A8B5] rounded focus:ring-[#00A8B5]"
                />
                <div className="flex-1">
                  <span className="font-medium text-gray-900">Time (HHMMSS)</span>
                  <p className="text-xs text-gray-500">e.g., 143052</p>
                </div>
              </label>
            </div>
          </div>

          {/* Counter */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">Starting Counter</label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={counter}
                onChange={(e) => setCounter(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="9999"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00A8B5] focus:outline-none text-lg font-mono"
              />
              <button
                onClick={() => setCounter(1)}
                className="px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <p className="text-xs text-gray-500">Auto-increments: 0001, 0002, 0003...</p>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-linear-to-br from-[#00A8B5]/10 to-[#153B6B]/10 p-6 rounded-xl border-2 border-[#00A8B5]/30 mb-6">
          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <FileType className="w-5 h-5 text-[#00A8B5]" />
            Preview
          </h4>
          <div className="bg-white p-4 rounded-lg border border-[#00A8B5]/30 font-mono text-lg text-gray-900 break-all">
            {exampleFilename}
          </div>
          <p className="text-xs text-gray-600 mt-3">
            Next file: {generateExample().replace(/(\d{4})\.pdf$/, (_, num) => String(parseInt(num) + 1).padStart(4, '0') + '.pdf')}
          </p>
        </div>

        {/* Copy Pattern */}
        <div className="flex gap-3">
          <motion.button
            onClick={copyToClipboard}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-linear-to-r from-[#153B6B] to-[#00A8B5] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Pattern
              </>
            )}
          </motion.button>
        </div>

        {/* Configuration Tip */}
        <div className="mt-6 bg-[#00A8B5]/10 border border-[#00A8B5]/30 rounded-xl p-5">
          <h4 className="font-semibold text-[#153B6B] mb-2 text-sm">💡 Setup Tip</h4>
          <p className="text-sm text-gray-700">
            Configure this pattern in SCO SMB&apos;s settings. The software will automatically name all scanned files using this convention, ensuring consistency across your entire organization.
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-6 space-y-2 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="text-[#00A8B5] font-bold mt-0.5">✓</span>
            <span>Consistent naming prevents file confusion</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#00A8B5] font-bold mt-0.5">✓</span>
            <span>Automatic date/time stamps for easy sorting</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#00A8B5] font-bold mt-0.5">✓</span>
            <span>Sequential numbering prevents duplicates</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#00A8B5] font-bold mt-0.5">✓</span>
            <span>Searchable and organized file structure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
