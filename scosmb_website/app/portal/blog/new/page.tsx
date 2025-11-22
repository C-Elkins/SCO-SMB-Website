'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  AlertTriangle,
  CheckCircle,
  BookOpen,
  Wrench,
  MessageSquare,
  X,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'guide',
    tags: [] as string[],
    severity: '',
    status: 'open',
    affected_versions: [] as string[],
    related_printers: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [versionInput, setVersionInput] = useState('');
  const [printerInput, setPrinterInput] = useState('');

  const categories = [
    { value: 'issue', label: 'Issue', icon: AlertTriangle, color: 'text-red-600' },
    { value: 'fix', label: 'Fix', icon: CheckCircle, color: 'text-green-600' },
    { value: 'guide', label: 'Guide', icon: BookOpen, color: 'text-blue-600' },
    { value: 'tip', label: 'Tip', icon: Wrench, color: 'text-purple-600' },
    { value: 'question', label: 'Question', icon: MessageSquare, color: 'text-gray-600' },
  ];

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const addVersion = () => {
    if (versionInput && !formData.affected_versions.includes(versionInput)) {
      setFormData({ ...formData, affected_versions: [...formData.affected_versions, versionInput] });
      setVersionInput('');
    }
  };

  const removeVersion = (version: string) => {
    setFormData({ ...formData, affected_versions: formData.affected_versions.filter((v) => v !== version) });
  };

  const addPrinter = () => {
    if (printerInput && !formData.related_printers.includes(printerInput)) {
      setFormData({ ...formData, related_printers: [...formData.related_printers, printerInput] });
      setPrinterInput('');
    }
  };

  const removePrinter = (printer: string) => {
    setFormData({ ...formData, related_printers: formData.related_printers.filter((p) => p !== printer) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tech/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/portal/blog');
      } else {
        setError(data.error || 'Failed to create post');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container-wide py-4">
          <div className="flex items-center gap-4">
            <Link href="/portal/blog" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#153B6B]">Create New Post</h1>
              <p className="text-sm text-gray-600">Share knowledge with the team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container-wide py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent text-lg"
                placeholder="e.g., Kyocera FTP Port 21 Connection Issues"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, category: cat.value })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.category === cat.value
                          ? 'border-[#00A8B5] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${cat.color}`} />
                      <span className="text-sm font-medium text-gray-900">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                rows={10}
                placeholder="Describe the issue, solution, or share your knowledge..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">Markdown supported</p>
            </div>

            {/* Severity (for issues) */}
            {formData.category === 'issue' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Severity
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                >
                  <option value="">Select severity</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            )}

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                  placeholder="Add tag (press Enter)"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    #{tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Affected Versions */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Affected Versions</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={versionInput}
                  onChange={(e) => setVersionInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addVersion())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                  placeholder="e.g., v1.0, v1.1"
                />
                <button
                  type="button"
                  onClick={addVersion}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.affected_versions.map((version) => (
                  <span
                    key={version}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {version}
                    <button type="button" onClick={() => removeVersion(version)} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Related Printers */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Related Printers</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={printerInput}
                  onChange={(e) => setPrinterInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrinter())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A8B5] focus:border-transparent"
                  placeholder="e.g., Kyocera TASKalfa, Sharp MX"
                />
                <button
                  type="button"
                  onClick={addPrinter}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.related_printers.map((printer) => (
                  <span
                    key={printer}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {printer}
                    <button type="button" onClick={() => removePrinter(printer)} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-[#153B6B] to-[#00A8B5] text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Publish Post
                  </>
                )}
              </button>
              <Link
                href="/portal/blog"
                className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-semibold"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
