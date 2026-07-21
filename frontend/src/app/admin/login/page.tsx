"use client";

import { useState, FormEvent } from "react";
import { useAdminAuth, ApiClientError } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(
        err instanceof ApiClientError ? err.message : "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper-dim px-6">
      <div className="w-full max-w-sm bg-paper border border-line p-8">
        <span className="font-display font-semibold text-lg text-ink">
          SASFM<span className="text-amber"> Admin</span>
        </span>
        <h1 className="mt-6 text-xl font-semibold text-ink">Sign in</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm text-ink">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
            />
          </label>

          <label className="block">
            <span className="text-sm text-ink">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full bg-paper-dim border-0 border-b border-ink/70 px-3 py-2.5 text-sm text-ink focus:border-teal outline-none"
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-ink text-paper font-semibold text-sm px-6 py-3 hover:bg-teal transition-colors disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
