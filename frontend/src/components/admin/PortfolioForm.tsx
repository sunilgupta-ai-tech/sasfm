"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import { api } from "@/lib/api";
import { slugify } from "@/lib/slugify";
import { revalidatePublicPaths } from "@/lib/actions/revalidate";
import ImageUploadField from "@/components/admin/ImageUploadField";
import FormCard from "@/components/admin/ui/FormCard";
import SeoFieldsSection, {
  type SeoValues,
  emptySeoValues,
} from "@/components/admin/SeoFieldsSection";

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
  const [slugTouched, setSlugTouched] = useState(
    mode === "edit" && initialValues.slug !== ""
  );

  function set<K extends keyof PortfolioFormValues>(
    key: K,
    value: PortfolioFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function setName(name: string) {
    setValues((prev) => ({
      ...prev,
      name,
      slug: slugTouched ? prev.slug : slugify(name),
    }));
  }

  function setSlug(slug: string) {
    setSlugTouched(true);
    set("slug", slug);
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
      await revalidatePublicPaths(["/", "/portfolio", `/portfolio/${values.slug}`]);
      router.push("/admin/portfolio");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          <FormCard title="Project Info" description="Core details shown on the project page.">
            <label className="block">
              <span className="text-sm text-ink">Project Name</span>
              <input
                type="text"
                required
                value={values.name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
              />
            </label>

            <label className="block">
              <span className="text-sm text-ink">Slug</span>
              <input
                type="text"
                required
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                title="Lowercase letters, numbers, hyphens only"
                value={values.slug}
                onChange={(e) => setSlug(e.target.value)}
                className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
              />
            </label>

            <label className="block">
              <span className="text-sm text-ink">Location</span>
              <input
                type="text"
                required
                value={values.location}
                onChange={(e) => set("location", e.target.value)}
                className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
              />
            </label>

            <label className="block">
              <span className="text-sm text-ink">Summary</span>
              <textarea
                required
                rows={7}
                value={values.summary}
                onChange={(e) => set("summary", e.target.value)}
                className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none resize-y"
              />
            </label>
          </FormCard>

          <FormCard
            title="Scope of Services"
            description="Add each service included in this project."
          >
            <div>
              <div className="flex flex-wrap gap-2">
                {values.scope.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 text-sm text-ink"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeScope(i)}
                      aria-label={`Remove ${item}`}
                    >
                      <X className="h-3 w-3 text-slate hover:text-red-600" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
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
                  className="flex-1 bg-paper-dim border-0 border-b border-ink/70 px-3 py-2 text-sm text-ink focus:border-teal outline-none"
                />
                <button
                  type="button"
                  onClick={addScope}
                  className="border border-line px-4 py-2 text-sm text-ink hover:bg-paper-dim transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </FormCard>

          <SeoFieldsSection
            values={values}
            onChange={(seo) => setValues((prev) => ({ ...prev, ...seo }))}
          />
        </div>

        {/* Sidebar column */}
        <div className="space-y-6">
          <FormCard title="Project Category">
            <select
              value={values.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FormCard>

          <FormCard title="Feature Image">
            <ImageUploadField
              label=""
              value={values.imageUrl}
              onChange={(url) => set("imageUrl", url)}
              uploadPath="/api/admin/uploads/portfolio"
              variant="tile"
            />
          </FormCard>

          <FormCard title="Project Status">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-ink">
                {values.published ? "Published" : "Draft"}
              </span>
              <span className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  checked={values.published}
                  onChange={(e) => set("published", e.target.checked)}
                  className="peer sr-only"
                />
                <span className="h-6 w-11 rounded-full bg-line peer-checked:bg-teal transition-colors" />
                <span className="absolute left-0.5 h-5 w-5 rounded-full bg-paper shadow-sm transition-transform peer-checked:translate-x-5" />
              </span>
            </label>
            <p className="mt-2 text-xs text-slate/70">
              Published projects are visible on the live site.
            </p>
          </FormCard>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-ink text-paper font-semibold text-sm px-7 py-3 hover:bg-teal transition-colors disabled:opacity-60"
        >
          {saving ? "Saving…" : mode === "create" ? "Create Project" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
