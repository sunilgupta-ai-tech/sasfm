export function WorkforceIllustration() {
  return (
    <svg viewBox="0 0 96 72" className="h-16 w-auto" aria-hidden>
      <ellipse cx="48" cy="64" rx="34" ry="5" fill="var(--color-ink)" opacity="0.08" />
      {/* person 1 */}
      <g transform="translate(10,14)">
        <rect x="6" y="20" width="16" height="24" rx="4" fill="var(--color-steel)" />
        <circle cx="14" cy="10" r="9" fill="#e8b892" />
        <path d="M5 10a9 9 0 0 1 18 0" fill="var(--color-amber)" />
        <rect x="3" y="34" width="6" height="14" rx="2" fill="var(--color-ink)" />
        <rect x="19" y="34" width="6" height="14" rx="2" fill="var(--color-ink)" />
      </g>
      {/* person 2 (front, taller) */}
      <g transform="translate(36,6)">
        <rect x="6" y="24" width="20" height="28" rx="5" fill="var(--color-teal)" />
        <circle cx="16" cy="12" r="10" fill="#d99a6c" />
        <path d="M5.5 12a10.5 10.5 0 0 1 21 0" fill="var(--color-amber-dark)" />
        <rect x="3" y="40" width="7" height="16" rx="2" fill="var(--color-ink)" />
        <rect x="22" y="40" width="7" height="16" rx="2" fill="var(--color-ink)" />
      </g>
      {/* person 3 */}
      <g transform="translate(64,16)">
        <rect x="6" y="20" width="16" height="24" rx="4" fill="var(--color-amber)" opacity="0.85" />
        <circle cx="14" cy="10" r="9" fill="#f0c9a0" />
        <path d="M5 10a9 9 0 0 1 18 0" fill="var(--color-ink)" />
        <rect x="3" y="34" width="6" height="14" rx="2" fill="var(--color-ink)" />
        <rect x="19" y="34" width="6" height="14" rx="2" fill="var(--color-ink)" />
      </g>
    </svg>
  );
}

export function GlobeIllustration() {
  return (
    <svg viewBox="0 0 72 72" className="h-16 w-auto" aria-hidden>
      <ellipse cx="36" cy="64" rx="22" ry="4" fill="var(--color-ink)" opacity="0.08" />
      <circle cx="36" cy="34" r="26" fill="var(--color-paper-dim)" stroke="var(--color-steel)" strokeWidth="1.5" />
      <path
        d="M36 8c8 8 8 40 0 52M36 8c-8 8-8 40 0 52"
        fill="none"
        stroke="var(--color-steel)"
        strokeWidth="1.2"
        opacity="0.7"
      />
      <path d="M10 34h52M14 20h44M14 48h44" stroke="var(--color-steel)" strokeWidth="1.2" opacity="0.7" />
      <path
        d="M20 18c4 6 3 13-2 16-6 4-4 12 2 14 5 2 4 9 10 10"
        fill="none"
        stroke="var(--color-teal)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M46 12c6 4 10 10 8 18-2 7 4 10 6 16"
        fill="none"
        stroke="var(--color-amber-dark)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="18" r="2.2" fill="var(--color-teal)" />
      <circle cx="30" cy="48" r="2.2" fill="var(--color-teal)" />
      <circle cx="52" cy="46" r="2.2" fill="var(--color-amber-dark)" />
    </svg>
  );
}

export function SavingsIllustration() {
  return (
    <svg viewBox="0 0 90 72" className="h-16 w-auto" aria-hidden>
      <ellipse cx="45" cy="66" rx="30" ry="4" fill="var(--color-ink)" opacity="0.08" />
      {/* laptop base */}
      <rect x="14" y="18" width="62" height="38" rx="3" fill="var(--color-ink)" />
      <rect x="18" y="22" width="54" height="28" rx="1.5" fill="var(--color-paper)" />
      <path d="M6 56h78l-6 8H12z" fill="var(--color-steel)" />
      {/* chart on screen */}
      <g transform="translate(24,26)">
        <rect x="0" y="16" width="6" height="10" fill="var(--color-teal)" />
        <rect x="9" y="10" width="6" height="16" fill="var(--color-teal)" />
        <rect x="18" y="4" width="6" height="22" fill="var(--color-amber)" />
        <rect x="27" y="12" width="6" height="14" fill="var(--color-teal)" />
        <rect x="36" y="2" width="6" height="24" fill="var(--color-amber-dark)" />
        <path
          d="M0 20 L9 14 L18 8 L27 16 L36 4"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}

export function SustainabilityIllustration() {
  return (
    <svg viewBox="0 0 84 72" className="h-16 w-auto" aria-hidden>
      <ellipse cx="42" cy="66" rx="28" ry="4" fill="var(--color-ink)" opacity="0.08" />
      {/* tablet */}
      <rect x="8" y="10" width="44" height="52" rx="4" fill="var(--color-ink)" />
      <rect x="12" y="16" width="36" height="40" rx="1.5" fill="var(--color-paper)" />
      <path
        d="M16 46 L24 34 L30 40 L40 22"
        fill="none"
        stroke="var(--color-teal)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="22" r="2" fill="var(--color-amber-dark)" />
      <circle cx="30" cy="40" r="2" fill="var(--color-teal)" />
      {/* leaf */}
      <g transform="translate(46,32)">
        <path
          d="M30 4C14 4 4 14 4 30c16 0 26-10 26-26z"
          fill="var(--color-amber)"
        />
        <path
          d="M6 28C14 20 20 14 28 6"
          fill="none"
          stroke="var(--color-amber-dark)"
          strokeWidth="1.4"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}

export function SpendIllustration() {
  return (
    <svg viewBox="0 0 88 72" className="h-16 w-auto" aria-hidden>
      <ellipse cx="44" cy="66" rx="30" ry="4" fill="var(--color-ink)" opacity="0.08" />
      {/* calculator */}
      <rect x="30" y="10" width="40" height="52" rx="4" fill="var(--color-ink)" />
      <rect x="35" y="16" width="30" height="10" rx="1.5" fill="var(--color-paper)" />
      {Array.from({ length: 3 }).map((_, row) =>
        Array.from({ length: 3 }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={35 + col * 10}
            y={32 + row * 10}
            width="7"
            height="7"
            rx="1.5"
            fill={col === 2 && row === 0 ? "var(--color-amber)" : "var(--color-steel)"}
          />
        ))
      )}
      {/* coin stack */}
      <g transform="translate(6,34)">
        <ellipse cx="14" cy="26" rx="14" ry="5" fill="var(--color-amber-dark)" />
        <ellipse cx="14" cy="20" rx="14" ry="5" fill="var(--color-amber)" />
        <ellipse cx="14" cy="14" rx="14" ry="5" fill="var(--color-amber-dark)" />
        <ellipse cx="14" cy="8" rx="14" ry="5" fill="var(--color-amber)" />
        <text
          x="14"
          y="11"
          textAnchor="middle"
          fontSize="6"
          fontFamily="var(--font-mono)"
          fill="var(--color-ink)"
          opacity="0.6"
        >
          $
        </text>
      </g>
    </svg>
  );
}
