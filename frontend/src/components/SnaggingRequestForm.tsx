"use client";

import { useState, FormEvent } from "react";
import { Check } from "lucide-react";
import { api, ApiClientError } from "@/lib/api";

type Status = "idle" | "submitting" | "error" | "success";

export default function SnaggingRequestForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
    const buildingName = (
      form.elements.namedItem("buildingName") as HTMLInputElement
    ).value;

    try {
      await api.post("/api/enquiries", {
        name,
        email,
        phone,
        subject: "Free Building Snagging Request",
        message: `Building Name: ${buildingName}`,
      });
      setStatus("success");
      onSuccess?.();
    } catch (err) {
      setErrorMessage(
        err instanceof ApiClientError
          ? err.message
          : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="px-8 py-12 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
          <Check className="h-7 w-7 text-teal" strokeWidth={2} />
        </span>
        <p className="mt-5 font-mono-label text-xs uppercase text-teal">
          Request received
        </p>
        <p className="mt-3 font-serif-display text-2xl text-ink">
          Thanks — we&apos;ll be in touch shortly.
        </p>
        <p className="mt-3 text-sm text-slate leading-relaxed max-w-xs mx-auto">
          A specialist will contact you within one business day to schedule
          your free building snagging inspection.
        </p>
      </div>
    );
  }

  return (
    <div className="px-8 pt-10 pb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="h-px w-6 bg-amber" />
        <p className="font-mono-label text-xs uppercase text-amber-dark">
          Free Building Snagging
        </p>
      </div>
      <h2 className="font-serif-display text-2xl text-ink leading-snug">
        Request your free snagging report.
      </h2>
      <p className="mt-3 text-sm text-slate leading-relaxed">
        No obligation to sign an FM contract. A specialist will confirm your
        inspection within one business day.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <label className="block">
          <span className="text-sm text-ink">Name</span>
          <input
            name="name"
            type="text"
            required
            className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm text-ink">Email</span>
          <input
            name="email"
            type="email"
            required
            className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm text-ink">Phone</span>
          <input
            name="phone"
            type="tel"
            required
            className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm text-ink">Building Name</span>
          <input
            name="buildingName"
            type="text"
            required
            className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
          />
        </label>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-amber text-ink font-semibold text-sm px-6 py-3.5 hover:bg-amber-dark hover:text-paper transition-colors disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request Free Snagging Report"}
        </button>

        {status === "error" && (
          <p className="text-sm text-red-600">
            {errorMessage ?? "Something went wrong. Please try again."}
          </p>
        )}
      </form>
    </div>
  );
}
