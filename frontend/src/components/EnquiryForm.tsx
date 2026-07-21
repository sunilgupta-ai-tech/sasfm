"use client";

import { useState, FormEvent } from "react";
import { api, ApiClientError } from "@/lib/api";

type Status = "idle" | "submitting" | "error" | "success";

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [agreed, setAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      await api.post("/api/enquiries", payload);
      setStatus("success");
      form.reset();
      setAgreed(false);
    } catch (err) {
      setErrorMessage(
        err instanceof ApiClientError ? err.message : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-teal/40 bg-teal/5 p-8">
        <p className="font-mono-label text-xs uppercase text-teal mb-2">
          Enquiry sent
        </p>
        <p className="text-ink text-lg font-medium">
          Thanks — we&apos;ve received your enquiry.
        </p>
        <p className="mt-2 text-sm text-slate">
          A specialist will reach out within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Name" name="name" type="text" required />
        <Field label="Email Address" name="email" type="email" required />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Phone Number (optional)" name="phone" type="tel" />
        <Field label="Subject" name="subject" type="text" required />
      </div>

      <label className="block">
        <span className="text-ink">Message</span>
        <textarea
          name="message"
          rows={6}
          required
          className="mt-2 w-full bg-paper-dim border-0 border-b border-ink/70 px-4 py-3 text-sm text-ink focus:border-teal outline-none resize-y"
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-slate leading-relaxed">
        <input
          type="checkbox"
          required
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-ink"
        />
        <span>
          By providing your details you agree to your personal information
          being collected, held, used and disclosed by us in accordance with
          our{" "}
          <a href="#" className="underline text-ink hover:text-teal">
            Privacy Policy
          </a>
          . (required)
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-ink text-paper font-semibold text-sm px-8 py-4 hover:bg-teal transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Submit"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">
          {errorMessage ?? "Something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-ink">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full bg-paper-dim border-0 border-b border-ink/70 px-4 py-3 text-sm text-ink focus:border-teal outline-none"
      />
    </label>
  );
}
