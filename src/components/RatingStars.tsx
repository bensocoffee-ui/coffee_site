import { faNumber } from "@/lib/data";

export default function RatingStars({
  rating,
  reviews,
  size = "sm",
}: {
  rating: number;
  reviews?: number;
  size?: "sm" | "md";
}) {
  const pct = (rating / 5) * 100;
  const textSize = size === "md" ? "text-lg" : "text-sm";
  return (
    <div className="flex items-center gap-1.5">
      <div className={`relative inline-block leading-none ${textSize}`}>
        <span className="text-sand">★★★★★</span>
        <span
          className="absolute inset-y-0 right-0 overflow-hidden whitespace-nowrap text-caramel"
          style={{ width: `${pct}%` }}
        >
          ★★★★★
        </span>
      </div>
      <span className="text-xs text-taiga">
        {faNumber(rating)}
        {reviews !== undefined && ` (${faNumber(reviews)} دیدگاه)`}
      </span>
    </div>
  );
}
