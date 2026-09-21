"use client";

import { useState } from "react";
import Image from "next/image";
import ProductVisual from "@/components/ProductVisual";
import { type Product, faNumber } from "@/lib/data";

export default function ProductGallery({
  product,
  discount,
}: {
  product: Product;
  discount?: number;
}) {
  const [activeTab, setActiveTab] = useState<"sleeve" | "capsule">(
    product.sleeve_img ? "sleeve" : "capsule"
  );

  const currentImage =
    activeTab === "sleeve" && product.sleeve_img
      ? product.sleeve_img
      : product.img;

  return (
    <div className="flex flex-col gap-4">
      {/* Main image container */}
      <div className="group relative overflow-hidden rounded-3xl border border-latte bg-[#fcfbfa] shadow-sm">
        <div className="relative aspect-square w-full">
          {currentImage ? (
            <Image
              key={currentImage}
              src={currentImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6 transition-all duration-300"
            />
          ) : (
            <ProductVisual
              type={product.art.type}
              from={product.art.from}
              to={product.art.to}
              className="absolute inset-0"
            />
          )}
        </div>

        {/* Discount Badge */}
        {discount !== undefined && discount > 0 && (
          <span className="absolute top-5 right-5 z-10 rounded-full bg-red-600 px-4 py-1.5 text-sm font-extrabold text-white shadow-md">
            ٪{faNumber(discount)} تخفیف
          </span>
        )}

        {/* Sleeve Indicator Tag */}
        {activeTab === "sleeve" && product.sleeve_img && (
          <span className="absolute bottom-4 right-4 z-10 rounded-xl bg-espresso/90 px-3 py-1.5 text-xs font-bold text-latte shadow backdrop-blur-sm">
            بسته رسمی ۱۰ عددی
          </span>
        )}
      </div>

      {/* Dual angle thumbnails if sleeve_img exists */}
      {product.sleeve_img && product.img && (
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("sleeve")}
            className={`flex items-center gap-3 rounded-2xl border-2 p-2.5 text-right transition-all ${
              activeTab === "sleeve"
                ? "border-caramel bg-latte/60 shadow-sm"
                : "border-latte bg-white hover:border-caramel/40"
            }`}
          >
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-latte bg-white p-1">
              <Image
                src={product.sleeve_img}
                alt="جعبه ۱۰ عددی"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-espresso">
                جعبه ۱۰ عددی (اسلیو)
              </div>
              <div className="text-[10px] text-caramel-dark font-medium">
                بسته کامل ارسالی
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("capsule")}
            className={`flex items-center gap-3 rounded-2xl border-2 p-2.5 text-right transition-all ${
              activeTab === "capsule"
                ? "border-caramel bg-latte/60 shadow-sm"
                : "border-latte bg-white hover:border-caramel/40"
            }`}
          >
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-latte bg-white p-1">
              <Image
                src={product.img}
                alt="نمای کپسول"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-xs font-bold text-espresso">
                نمای کپسول
              </div>
              <div className="text-[10px] text-taiga">
                جزئیات و بدنه
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
