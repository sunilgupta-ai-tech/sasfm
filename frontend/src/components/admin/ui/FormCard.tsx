export default function FormCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-line bg-paper shadow-sm">
      <div className="border-b border-line px-6 py-4">
        <h3 className="text-sm font-semibold text-ink">{title}</h3>
        {description && <p className="mt-0.5 text-xs text-slate/70">{description}</p>}
      </div>
      <div className="p-6 space-y-6">{children}</div>
    </div>
  );
}