"use client";
import React, { useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Debounce utility
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const schema = z.object({
  key: z.string().min(10, 'Key too short').max(50, 'Key too long'),
});

interface Props {
  endpoint?: string;
  placeholder?: string;
  submitLabel?: string;
  buildPayload?: (key: string) => Record<string, unknown>;
  onValidated?: (data: any) => void;
}

export function LicenseKeyForm({
  endpoint = '/api/licenses/validate',
  placeholder = 'XXXX-XXXX-XXXX-XXXX',
  submitLabel = 'Validate',
  buildPayload,
  onValidated
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    watch
  } = useForm<{ key: string }>({ resolver: zodResolver(schema) });

  const keyValue = watch('key', '');

  function formatKey(raw: string) {
    let formatted = raw.toUpperCase().replace(/[^A-Z0-9-]/g, '');
    if (formatted.length > 0 && !formatted.startsWith('SCO-')) {
      formatted = `SCO-${formatted.replace(/^SCO-/, '')}`;
    }
    return formatted.slice(0, 19);
  }

  async function onSubmit(values: { key: string }) {
    try {
      const payload = buildPayload ? buildPayload(values.key) : { key: values.key };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.valid) {
        setError('key', { message: data.error || 'Invalid key' });
        return;
      }
      onValidated?.(data);
    } catch (error) {
      setError('key', { message: error instanceof Error ? error.message : 'Unexpected error' });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">License Key</label>
        <div className="relative">
          <input
            {...register('key')}
            value={keyValue}
            onChange={(event) => {
              const formatted = formatKey(event.target.value);
              setValue('key', formatted, { shouldDirty: true });
            }}
            placeholder={placeholder}
            className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-[#00A8B5] focus:border-[#00A8B5] transition-all duration-200 placeholder:text-gray-400"
            maxLength={19}
          />
          {keyValue && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
        {errors.key && (
          <div className="mt-2 flex items-center gap-2 text-red-600">
            <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-xs">!</span>
            </div>
            <p className="text-sm">{errors.key.message}</p>
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-gradient-to-r from-[#153B6B] to-[#00A8B5] hover:from-[#1e4a7f] hover:to-[#00c2d1] text-white px-6 py-4 text-base font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Validating License...
          </div>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
}
