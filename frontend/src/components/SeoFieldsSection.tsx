"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { TextInput, TextareaField, CheckboxField } from "@/components/admin/ui/Fields";

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
    <div className="rounded-lg border border-line bg-paper shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-paper-dim/50 transition-colors"
      >
        <span className="flex items-center gap-2.5">
          <Search className="h-4 w-4 text-teal" strokeWidth={1.5} />
          <span>
            <span className="block text-sm font-semibold text-ink">SEO Settings</span>
            <span className="block text-xs text-slate/70">Optional — improves search & social sharing</span>
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-slate transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-5 border-t border-line pt-6">
          <TextInput
            label="Meta Title"
            maxLength={70}
            value={values.metaTitle}
            onChange={(e) => set("metaTitle", e.target.value)}
            placeholder="Leave blank to use the page title"
            hint={`${values.metaTitle.length}/70`}
          />

          <TextareaField
            label="Meta Description"
            rows={3}
            maxLength={160}
            value={values.metaDescription}
            onChange={(e) => set("metaDescription", e.target.value)}
            placeholder="Leave blank to use the summary/excerpt"
            hint={`${values.metaDescription.length}/160`}
          />

          <TextInput
            label="Focus Keyword"
            value={values.focusKeyword}
            onChange={(e) => set("focusKeyword", e.target.value)}
            placeholder="e.g. facilities management dubai"
          />

          <TextInput
            label="Social Share Image URL"
            value={values.ogImageUrl}
            onChange={(e) => set("ogImageUrl", e.target.value)}
            placeholder="Leave blank to use the main image"
          />

          <TextInput
            label="Canonical Path Override"
            value={values.canonicalPath}
            onChange={(e) => set("canonicalPath", e.target.value)}
            placeholder="Leave blank to use the default URL"
          />

          <CheckboxField
            label="Hide this page from search engines"
            description="Enables a noindex tag — the page stays live but won't appear in search results"
            checked={values.noIndex}
            onChange={(e) => set("noIndex", e.target.checked)}
          />
        </div>
      )}
    </div>
  );
}