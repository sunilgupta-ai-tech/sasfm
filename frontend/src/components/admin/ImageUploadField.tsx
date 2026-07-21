"use client";

import { useState, useRef } from "react";
import { ImageIcon, Upload, X } from "lucide-react";
import { API_URL, apiImageUrl } from "@/lib/api";
import { useAdminAuth } from "@/lib/admin-auth";

export default function ImageUploadField({
  label,
  value,
  onChange,
  uploadPath,
  variant = "row",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  uploadPath:
    | "/api/admin/uploads/portfolio"
    | "/api/admin/uploads/blog"
    | "/api/admin/uploads/team";
  variant?: "row" | "tile";
}) {
  const { token } = useAdminAuth();
  const [uploading, setUploading] = useState(false);
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

  const fileInput = (
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
  );

  if (variant === "tile") {
    return (
      <div>
        {label && <span className="text-sm font-medium text-ink">{label}</span>}

        <div className="flex flex-col items-center gap-4">
          {fileInput}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="relative aspect-square w-full max-w-[220px] rounded-md border-2 border-dashed border-line bg-paper-dim overflow-hidden flex items-center justify-center hover:border-teal transition-colors disabled:opacity-60"
          >
            {value ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={apiImageUrl(value)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <ImageIcon className="h-10 w-10 text-slate/30" strokeWidth={1.5} />
            )}
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-md bg-ink text-paper text-sm font-semibold px-4 py-2 hover:bg-teal transition-colors disabled:opacity-60"
            >
              <Upload className="h-3.5 w-3.5" strokeWidth={2} />
              {uploading ? "Uploading…" : "Choose Image"}
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

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste an image URL…"
            className="w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2 text-xs text-ink focus:border-teal outline-none text-center"
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div>
      <span className="text-sm text-ink">{label}</span>

      <div className="mt-2 flex items-start gap-4">
        <div className="relative h-28 w-40 shrink-0 bg-paper-dim border border-line overflow-hidden">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={apiImageUrl(value)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate/40 text-xs">
              No image
            </div>
          )}
        </div>

        <div className="flex-1">
          {fileInput}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 border border-line px-4 py-2 text-sm text-ink hover:bg-paper-dim transition-colors disabled:opacity-60"
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
          <p className="mt-2 text-xs text-slate/60">
            Or paste an image URL directly:
          </p>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/uploads/... or https://..."
            className="mt-1 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2 text-xs text-ink focus:border-teal outline-none"
          />
          {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
