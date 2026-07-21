"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import { api } from "@/lib/api";
import { revalidatePublicPaths } from "@/lib/actions/revalidate";
import ImageUploadField from "@/components/admin/ImageUploadField";
import FormCard from "@/components/admin/ui/FormCard";
import SeoFieldsSection, {
  type SeoValues,
  emptySeoValues,
} from "@/components/admin/SeoFieldsSection";

export type BlogFormValues = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  date: string; // yyyy-mm-dd for <input type="date">
  imageUrl: string;
  body: string[];
  published: boolean;
} & SeoValues;

export const emptyBlogValues: BlogFormValues = {
  slug: "",
  title: "",
  excerpt: "",
  tag: "",
  readTime: "",
  date: new Date().toISOString().slice(0, 10),
  imageUrl: "",
  body: [""],
  published: true,
  ...emptySeoValues,
};

export default function BlogForm({
  mode,
  postId,
  initialValues,
}: {
  mode: "create" | "edit";
  postId?: string;
  initialValues: BlogFormValues;
}) {
  const { token } = useAdminAuth();
  const router = useRouter();
  const [values, setValues] = useState<BlogFormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof BlogFormValues>(key: K, value: BlogFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function setParagraph(index: number, text: string) {
    const next = [...values.body];
    next[index] = text;
    set("body", next);
  }

  function addParagraph() {
    set("body", [...values.body, ""]);
  }

  function removeParagraph(index: number) {
    set(
      "body",
      values.body.filter((_, i) => i !== index)
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSaving(true);

    const payload = {
      ...values,
      body: values.body.filter((p) => p.trim().length > 0),
      metaTitle: values.metaTitle || null,
      metaDescription: values.metaDescription || null,
      ogImageUrl: values.ogImageUrl || null,
      canonicalPath: values.canonicalPath || null,
      focusKeyword: values.focusKeyword || null,
    };

    try {
      if (mode === "create") {
        await api.post("/api/admin/blog", payload, token);
      } else {
        await api.put(`/api/admin/blog/${postId}`, payload, token);
      }
      await revalidatePublicPaths(["/", "/blog", `/blog/${values.slug}`]);
      router.push("/admin/blog");
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
          <FormCard title="Post Info" description="Core details shown on the article page.">
            <label className="block">
              <span className="text-sm text-ink">Title</span>
              <input
                type="text"
                required
                value={values.title}
                onChange={(e) => set("title", e.target.value)}
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
                onChange={(e) => set("slug", e.target.value)}
                className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
              />
            </label>

            <label className="block">
              <span className="text-sm text-ink">Excerpt</span>
              <textarea
                required
                rows={3}
                value={values.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none resize-y"
              />
            </label>

            <div className="grid sm:grid-cols-2 gap-6">
              <label className="block">
                <span className="text-sm text-ink">Read Time</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. 4 min read"
                  value={values.readTime}
                  onChange={(e) => set("readTime", e.target.value)}
                  className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
                />
              </label>

              <label className="block">
                <span className="text-sm text-ink">Publish Date</span>
                <input
                  type="date"
                  required
                  value={values.date}
                  onChange={(e) => set("date", e.target.value)}
                  className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
                />
              </label>
            </div>
          </FormCard>

          <FormCard title="Article Body" description="Each paragraph renders as its own block.">
            <div>
              <div className="space-y-3">
                {values.body.map((paragraph, i) => (
                  <div key={i} className="flex gap-2">
                    <textarea
                      rows={3}
                      value={paragraph}
                      onChange={(e) => setParagraph(i, e.target.value)}
                      placeholder={`Paragraph ${i + 1}`}
                      className="flex-1 bg-paper-dim border-0 border-b border-ink/70 px-3 py-2 text-sm text-ink focus:border-teal outline-none resize-y"
                    />
                    {values.body.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeParagraph(i)}
                        aria-label={`Remove paragraph ${i + 1}`}
                        className="self-start mt-2 text-slate hover:text-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addParagraph}
                className="mt-3 border border-line px-4 py-2 text-sm text-ink hover:bg-paper-dim transition-colors"
              >
                Add Paragraph
              </button>
            </div>
          </FormCard>

          <SeoFieldsSection
            values={values}
            onChange={(seo) => setValues((prev) => ({ ...prev, ...seo }))}
          />
        </div>

        {/* Sidebar column */}
        <div className="space-y-6">
          <FormCard title="Post Tag">
            <input
              type="text"
              required
              placeholder="e.g. Operations"
              value={values.tag}
              onChange={(e) => set("tag", e.target.value)}
              className="w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink outline-none focus:border-teal focus:ring-1 focus:ring-teal"
            />
          </FormCard>

          <FormCard title="Feature Image">
            <ImageUploadField
              label=""
              value={values.imageUrl}
              onChange={(url) => set("imageUrl", url)}
              uploadPath="/api/admin/uploads/blog"
              variant="tile"
            />
          </FormCard>

          <FormCard title="Post Status">
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
              Published posts are visible on the live site.
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
          {saving ? "Saving…" : mode === "create" ? "Publish Post" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
