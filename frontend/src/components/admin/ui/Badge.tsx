const VARIANTS = {
  published: "bg-teal/10 text-teal",
  draft: "bg-amber/15 text-amber-dark",
  new: "bg-amber/15 text-amber-dark",
  read: "bg-slate/10 text-slate",
  neutral: "bg-paper-dim text-slate border border-line",
};

export default function Badge({
  children,
  variant = "neutral",
}: {
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${VARIANTS[variant]}`}
    >
      {children}
    </span>
  );
}