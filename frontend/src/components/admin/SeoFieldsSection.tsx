"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type SeoValues = {
  metaTitle: string;
  metaDescription: string;
  ogImageUrl: string;
  canonicalPath: string;
  noIndex: boolean;
  focusKeyword: string;
};

export const emptySeoValues: SeoValues = {
  metaTitle: "",
  metaDescription: "",
  ogImageUrl: "",
  canonicalPath: "",
  noIndex: false,
  focusKeyword: "",
};

export default function SeoFieldsSection({
  values,
  onChange,
}: {
  values: SeoValues;
  onChange: (values: SeoValues) => void;
}) {
  const [open, setOpen] = useState(false);

  function set<K extends keyof SeoValues>(key: K, value: SeoValues[K]) {
    onChange({ ...values, [key]: value });
  }

  return (
    <div className="rounded-lg border border-line bg-paper shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <div>
          <h3 className="text-sm font-semibold text-ink">SEO Settings</h3>
          <p className="mt-0.5 text-xs text-slate/70">
            Optional overrides for search engines and social sharing.
          </p>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-slate shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-6 border-t border-line pt-6">
          <label className="block">
            <span className="text-sm text-ink">Meta Title</span>
            <input
              type="text"
              maxLength={70}
              value={values.metaTitle}
              onChange={(e) => set("metaTitle", e.target.value)}
              placeholder="Leave blank to use the page title"
              className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2 text-sm text-ink focus:border-teal outline-none"
            />
            <span className="text-xs text-slate/60">{values.metaTitle.length}/70</span>
          </label>

          <label className="block">
            <span className="text-sm text-ink">Meta Description</span>
            <textarea
              rows={3}
              maxLength={160}
              value={values.metaDescription}
              onChange={(e) => set("metaDescription", e.target.value)}
              placeholder="Leave blank to use the summary/excerpt"
              className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2 text-sm text-ink focus:border-teal outline-none resize-y"
            />
            <span className="text-xs text-slate/60">{values.metaDescription.length}/160</span>
          </label>

          <label className="block">
            <span className="text-sm text-ink">Focus Keyword</span>
            <input
              type="text"
              value={values.focusKeyword}
              onChange={(e) => set("focusKeyword", e.target.value)}
              placeholder="e.g. facilities management dubai"
              className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2 text-sm text-ink focus:border-teal outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm text-ink">Social Share Image URL</span>
            <input
              type="text"
              value={values.ogImageUrl}
              onChange={(e) => set("ogImageUrl", e.target.value)}
              placeholder="Leave blank to use the main image"
              className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2 text-sm text-ink focus:border-teal outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm text-ink">Canonical Path Override</span>
            <input
              type="text"
              value={values.canonicalPath}
              onChange={(e) => set("canonicalPath", e.target.value)}
              placeholder="Leave blank to use the default URL"
              className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2 text-sm text-ink focus:border-teal outline-none"
            />
          </label>

          <label className="flex items-center gap-2.5 text-sm text-ink">
            <input
              type="checkbox"
              checked={values.noIndex}
              onChange={(e) => set("noIndex", e.target.checked)}
              className="h-4 w-4 accent-ink"
            />
            Hide this page from search engines (noindex)
          </label>
        </div>
      )}
    </div>
  );
}
