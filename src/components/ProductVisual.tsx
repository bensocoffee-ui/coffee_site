import type { ArtType } from "@/lib/data";

function Art({ type }: { type: ArtType }) {
  const stroke = "rgba(255,255,255,0.92)";
  switch (type) {
    case "machine":
      return (
        <svg viewBox="0 0 120 120" className="h-28 w-28" fill="none">
          <rect x="22" y="18" width="76" height="34" rx="8" stroke={stroke} strokeWidth="3.5" />
          <circle cx="60" cy="35" r="9" stroke={stroke} strokeWidth="3" />
          <path d="M38 52v14h44V52" stroke={stroke} strokeWidth="3.5" />
          <path d="M54 66v6c0 4-3 6-7 7l-13 3" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          <path d="M66 66v4h20v-4" stroke={stroke} strokeWidth="3" />
          <path d="M46 92h28l-4-12H50l-4 12Z" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
          <path d="M56 74c1.5 2.5-1.5 4.5 0 7M64 74c1.5 2.5-1.5 4.5 0 7" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "capsule":
      return (
        <svg viewBox="0 0 120 120" className="h-28 w-28" fill="none">
          <path
            d="M42 24c10-8 26-8 36 0l-6 62c-.6 6-5 10-11 10h-2c-6 0-10.4-4-11-10l-6-62Z"
            stroke={stroke}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <ellipse cx="60" cy="24" rx="18" ry="7" stroke={stroke} strokeWidth="3" />
          <path d="M45 48c9 4 21 4 30 0M47 66c8 3.5 18 3.5 26 0" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M88 40c6 2 8 7 6 12s-7 7-12 6" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" opacity=".55" />
        </svg>
      );
    case "frother":
      return (
        <svg viewBox="0 0 120 120" className="h-28 w-28" fill="none">
          <path d="M40 30c0-6 4-10 10-10h20c6 0 10 4 10 10v4H40v-4Z" stroke={stroke} strokeWidth="3.5" />
          <path d="M38 34h44v46a16 16 0 0 1-16 16H54A16 16 0 0 1 38 80V34Z" stroke={stroke} strokeWidth="3.5" />
          <path d="M46 58c3 3 6 3 9 0s6-3 9 0 6 3 9 0M46 72c3 3 6 3 9 0s6-3 9 0 6 3 9 0" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M60 20v-8" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "stand":
      return (
        <svg viewBox="0 0 120 120" className="h-28 w-28" fill="none">
          <path d="M32 96V44m28 52V44m28 52V44" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M26 100h68" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M26 44h68" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
          <rect x="27" y="24" width="10" height="20" rx="4" stroke={stroke} strokeWidth="2.5" />
          <rect x="43" y="24" width="10" height="20" rx="4" stroke={stroke} strokeWidth="2.5" />
          <rect x="59" y="24" width="10" height="20" rx="4" stroke={stroke} strokeWidth="2.5" />
          <rect x="75" y="24" width="10" height="20" rx="4" stroke={stroke} strokeWidth="2.5" />
        </svg>
      );
    case "cup":
      return (
        <svg viewBox="0 0 120 120" className="h-28 w-28" fill="none">
          <path d="M32 46h48v22a20 20 0 0 1-20 20h-8a20 20 0 0 1-20-20V46Z" stroke={stroke} strokeWidth="3.5" />
          <path d="M80 50h8a10 10 0 0 1 0 20h-8" stroke={stroke} strokeWidth="3.5" />
          <ellipse cx="56" cy="46" rx="24" ry="6" stroke={stroke} strokeWidth="3" />
          <path d="M46 30c2-3-2-5 0-8M56 32c2-3-2-5 0-8M66 30c2-3-2-5 0-8" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 98h40" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "kit":
      return (
        <svg viewBox="0 0 120 120" className="h-28 w-28" fill="none">
          <path d="M46 34V22a6 6 0 0 1 6-6h16a6 6 0 0 1 6 6v12" stroke={stroke} strokeWidth="3.5" />
          <path d="M40 34h40v52a14 14 0 0 1-14 14H54a14 14 0 0 1-14-14V34Z" stroke={stroke} strokeWidth="3.5" />
          <path d="M40 62h40" stroke={stroke} strokeWidth="3" />
          <path d="M50 76c2 4-2 6 0 10M60 76c2 4-2 6 0 10M70 76c2 4-2 6 0 10" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
}

export default function ProductVisual({
  type,
  from,
  to,
  className = "",
}: {
  type: ArtType;
  from: string;
  to: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          background:
            "radial-gradient(circle at 78% 18%, rgba(255,255,255,.55), transparent 46%), radial-gradient(circle at 15% 85%, rgba(0,0,0,.4), transparent 50%)",
        }}
      />
      <div className="relative transition-transform duration-500 group-hover:scale-110">
        <Art type={type} />
      </div>
    </div>
  );
}
