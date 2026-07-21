"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import { api } from "@/lib/api";
import ImageUploadField from "@/components/admin/ImageUploadField";
import SeoFieldsSection, {
  type SeoValues,
  emptySeoValues,
} from "@/components/admin/SeoFieldsSection";
import FormCard from "@/components/admin/ui/FormCard";
import { TextInput, TextareaField, SelectField, CheckboxField } from "@/components/admin/ui/Fields";
import { Button } from "@/components/admin/ui/Button";

const CATEGORIES = [
  "Commercial",
  "Educational",
  "Healthcare",
  "Residential",
  "Town House",
];

export type PortfolioFormValues = {
  slug: string;
  name: string;
  category: string;
  location: string;
  scope: string[];
  summary: string;
  imageUrl: string;
  published: boolean;
} & SeoValues;

export const emptyPortfolioValues: PortfolioFormValues = {
  slug: "",
  name: "",
  category: CATEGORIES[0],
  location: "",
  scope: [],
  summary: "",
  imageUrl: "",
  published: true,
  ...emptySeoValues,
};

export default function PortfolioForm({
  mode,
  projectId,
  initialValues,
}: {
  mode: "create" | "edit";
  projectId?: string;
  initialValues: PortfolioFormValues;
}) {
  const { token } = useAdminAuth();
  const router = useRouter();
  const [values, setValues] = useState<PortfolioFormValues>(initialValues);
  const [scopeInput, setScopeInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof PortfolioFormValues>(
    key: K,
    value: PortfolioFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function addScope() {
    const trimmed = scopeInput.trim();
    if (!trimmed) return;
    set("scope", [...values.scope, trimmed]);
    setScopeInput("");
  }

  function removeScope(index: number) {
    set(
      "scope",
      values.scope.filter((_, i) => i !== index)
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSaving(true);

    const payload = {
      ...values,
      metaTitle: values.metaTitle || null,
      metaDescription: values.metaDescription || null,
      ogImageUrl: values.ogImageUrl || null,
      canonicalPath: values.canonicalPath || null,
      focusKeyword: values.focusKeyword || null,
    };

    try {
      if (mode === "create") {
        await api.post("/api/admin/portfolio", payload, token);
      } else {
        await api.put(`/api/admin/portfolio/${projectId}`, payload, token);
      }
      router.push("/admin/portfolio");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 pb-24">
      <FormCard title="Basic Information" description="The core details for this project">
        <div className="grid sm:grid-cols-2 gap-6">
          <TextInput
            label="Project Name"
            required
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Skyline Tech Park"
          />
          <TextInput
            label="Slug"
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            title="Lowercase letters, numbers, hyphens only"
            value={values.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="skyline-tech-park"
            hint="Used in the URL — lowercase, hyphen-separated"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <SelectField
            label="Category"
            value={values.category}
            onChange={(e) => set("category", e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectField>
          <TextInput
            label="Location"
            required
            value={values.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="e.g. Business Bay District"
          />
        </div>
      </FormCard>

      <FormCard title="Project Summary" description="Shown on the project detail page">
        <TextareaField
          label="Summary"
          required
          rows={4}
          value={values.summary}
          onChange={(e) => set("summary", e.target.value)}
          placeholder="Describe the scope and outcome of this project..."
        />
      </FormCard>

      <FormCard title="Scope of Services" description="Tags shown on the project detail page">
        <div>
          {values.scope.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {values.scope.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full bg-paper-dim border border-line px-3 py-1.5 text-sm text-ink"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeScope(i)}
                    aria-label={`Remove ${item}`}
                    className="text-slate hover:text-red-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={scopeInput}
              onChange={(e) => setScopeInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addScope();
                }
              }}
              placeholder="e.g. HVAC Maintenance"
              className="flex-1 rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/50 outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            />
            <Button type="button" variant="secondary" onClick={addScope}>
              Add
            </Button>
          </div>
        </div>
      </FormCard>

      <FormCard title="Cover Image" description="Displayed on the project card and detail page">
        <ImageUploadField
          label=""
          value={values.imageUrl}
          onChange={(url) => set("imageUrl", url)}
          uploadPath="/api/admin/uploads/portfolio"
        />
      </FormCard>

      <FormCard title="Visibility">
        <CheckboxField
          label="Published"
          description="Visible on the live site. Uncheck to save as a draft."
          checked={values.published}
          onChange={(e) => set("published", e.target.checked)}
        />
      </FormCard>

      <SeoFieldsSection
        values={values}
        onChange={(seo) => setValues((prev) => ({ ...prev, ...seo }))}
      />

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="sticky bottom-0 -mx-4 sm:-mx-8 border-t border-line bg-paper/95 backdrop-blur-sm px-4 sm:px-8 py-4 flex items-center gap-3">
        <Button type="submit" size="lg" disabled={saving}>
          {saving ? "Saving…" : mode === "create" ? "Create Project" : "Save Changes"}
        </Button>
        <Button type="button" variant="secondary" size="lg" onClick={() => router.push("/admin/portfolio")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}