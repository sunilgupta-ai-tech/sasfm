"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { API_URL, apiImageUrl } from "@/lib/api";
import { useAdminAuth } from "@/lib/admin-auth";

export default function ImageUploadField({
  label,
  value,
  onChange,
  uploadPath,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  uploadPath: "/api/admin/uploads/portfolio" | "/api/admin/uploads/blog";
}) {
  const { token } = useAdminAuth();
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API_URL}${uploadPath}`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");

      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="text-sm font-medium text-ink">{label}</span>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className={`mt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 rounded-lg border-2 border-dashed p-4 transition-colors ${
          dragOver ? "border-teal bg-teal/5" : "border-line bg-paper-dim/40"
        }`}
      >
        <div className="relative h-32 w-full sm:w-44 shrink-0 rounded-md bg-paper border border-line overflow-hidden">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={apiImageUrl(value)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-slate/40">
              <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
              <span className="text-xs">No image</span>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-md border border-line bg-paper px-4 py-2 text-sm font-medium text-ink hover:bg-paper-dim transition-colors disabled:opacity-60"
            >
              <Upload className="h-4 w-4" strokeWidth={1.5} />
              {uploading ? "Uploading…" : "Upload Image"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-1.5 text-sm text-slate hover:text-red-600 transition-colors"
              >
                <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                Remove
              </button>
            )}
          </div>
          <p className="mt-2.5 text-xs text-slate/60">
            Drag & drop, click to browse, or paste a URL below
          </p>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/uploads/... or https://..."
            className="mt-2 w-full rounded-md border border-line bg-paper px-3 py-2 text-xs text-ink outline-none focus:border-teal focus:ring-1 focus:ring-teal"
          />
          {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}