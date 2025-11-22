'use client';

import { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Mail, 
  Download, 
  FileText, 
  Key,
  Users,
  Trash2,
  RotateCcw,
  AlertCircle
} from 'lucide-react';

interface BulkActionsProps {
  type: 'keys' | 'customers';
  items: any[];
  onRefresh: () => void;
}

export function BulkActions({ type, items, onRefresh }: BulkActionsProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [processing, setProcessing] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map(item => item.id)));
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedIds.size === 0) {
      alert('Please select items first');
      return;
    }

    const confirmed = confirm(
      `Are you sure you want to ${action} ${selectedIds.size} ${type}?`
    );
    
    if (!confirmed) return;

    setProcessing(true);
    try {
      const response = await fetch(`/api/admin/bulk-${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          action,
          ids: Array.from(selectedIds)
        })
      });

      if (response.ok) {
        setSelectedIds(new Set());
        onRefresh();
        alert(`Successfully ${action}ed ${selectedIds.size} ${type}`);
      } else {
        throw new Error('Bulk action failed');
      }
    } catch (error) {
      console.error('Bulk action error:', error);
      alert('Failed to perform bulk action');
    } finally {
      setProcessing(false);
      setShowActions(false);
    }
  };

  const exportSelected = () => {
    const selectedItems = items.filter(item => selectedIds.has(item.id));
    const csv = type === 'keys'
      ? 'Key,Customer,Plan,Status,Created\n' + 
        selectedItems.map(k => 
          `${k.key},"${k.customer_name}",${k.plan},${k.status},${k.created_at}`
        ).join('\n')
      : 'Name,Email,Company,Plan,Status,Created\n' +
        selectedItems.map(c =>
          `"${c.name}","${c.email}","${c.company || ''}",${c.plan},${c.status},${c.created_at}`
        ).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const keyActions = [
    { id: 'revoke', label: 'Revoke Selected', icon: RotateCcw, color: 'orange' },
    { id: 'delete', label: 'Delete Selected', icon: Trash2, color: 'red' },
    { id: 'extend', label: 'Extend Expiry', icon: Key, color: 'green' },
  ];

  const customerActions = [
    { id: 'email', label: 'Send Email', icon: Mail, color: 'blue' },
    { id: 'delete', label: 'Delete Selected', icon: Trash2, color: 'red' },
  ];

  const actions = type === 'keys' ? keyActions : customerActions;

  return (
    <div className="space-y-3">
      {/* Selection Bar */}
      {selectedIds.size > 0 && (
        <div className="bg-gradient-to-r from-[#153B6B] to-[#00A8B5] text-white rounded-lg p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-4">
            <CheckSquare className="w-5 h-5" />
            <span className="font-medium">
              {selectedIds.size} {type} selected
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportSelected}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => setShowActions(!showActions)}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Bulk Actions'}
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Action Menu */}
      {showActions && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-lg">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Choose Bulk Action
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {actions.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => handleBulkAction(id)}
                disabled={processing}
                className={`p-3 rounded-lg border-2 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  color === 'red' ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100' :
                  color === 'orange' ? 'border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100' :
                  color === 'green' ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100' :
                  'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-medium">{label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Select All Checkbox */}
      <button
        onClick={toggleSelectAll}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        {selectedIds.size === items.length ? (
          <CheckSquare className="w-4 h-4 text-[#00A8B5]" />
        ) : (
          <Square className="w-4 h-4" />
        )}
        Select All ({items.length})
      </button>

      {/* Item Checkboxes - rendered by parent with this callback */}
      <input type="hidden" data-bulk-toggle={toggleSelect.toString()} />
    </div>
  );
}

// Helper component for item selection
export function SelectCheckbox({ 
  id, 
  selected, 
  onToggle 
}: { 
  id: string; 
  selected: boolean; 
  onToggle: (id: string) => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle(id);
      }}
      className="p-1 hover:bg-gray-100 rounded transition-colors"
    >
      {selected ? (
        <CheckSquare className="w-5 h-5 text-[#00A8B5]" />
      ) : (
        <Square className="w-5 h-5 text-gray-400" />
      )}
    </button>
  );
}
