"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Answer = {
  intensity?: "mild" | "medium" | "strong" | "decaf";
  type?: "espresso" | "milk" | "lungo" | "ice";
  flavor?: "chocolate" | "cereal" | "fruity" | "classic";
};

type ResultCapsule = {
  name: string;
  slug: string;
  tag: string;
  intensity: string;
  flavorProfile: string;
  img: string;
  price: string;
};

export default function CoffeeQuiz() {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Answer>({});
  const [result, setResult] = useState<ResultCapsule[] | null>(null);

  const calculateResult = (finalAnswers: Answer) => {
    // Decision logic
    if (finalAnswers.intensity === "decaf") {
      return [
        {
          name: "Arpeggio Decaffeinato",
          slug: "arpeggio-decaffeinato",
          tag: "بدون کافئین محبوب",
          intensity: "۹ از ۱۳",
          flavorProfile: "کاکائویی عمیق با روست قوی بدون افت کیفیت طعم",
          img: "/images/products/nespresso/main_7883.40.jpg",
          price: "۲,۰۵۰,۰۰۰ تومان",
        },
        {
          name: "Volluto Decaffeinato",
          slug: "volluto-decaffeinato",
          tag: "ملایم و بیسکویتی",
          intensity: "۴ از ۱۳",
          flavorProfile: "شیرین با نت‌های ملایم بیسکویتی و میوه‌ای",
          img: "/images/products/nespresso/main_7886.40.jpg",
          price: "۲,۰۵۰,۰۰۰ تومان",
        },
      ];
    }

    if (finalAnswers.type === "milk" || finalAnswers.flavor === "chocolate") {
      return [
        {
          name: "Barista Creations Chiaro",
          slug: "chiaro",
          tag: "ویژه ترکیب با شیر و کاپوچینو",
          intensity: "طراحی شده برای شیر",
          flavorProfile: "بافت خامه‌ای کاراملی در ترکیب با فوم شیر",
          img: "/images/products/nespresso/main_7932.40.jpg",
          price: "۲,۳۹۰,۰۰۰ تومان",
        },
        {
          name: "Barista Creations Caramello",
          slug: "caramello",
          tag: "عطر کارامل طبیعی",
          intensity: "طعم‌دار کرم‌کارامل",
          flavorProfile: "شیرینی کاراملی ملایم با عطر بیسکویت کره",
          img: "/images/products/nespresso/main_145524.jpg",
          price: "۲,۳۹۰,۰۰۰ تومان",
        },
        {
          name: "Barista Creations Scuro",
          slug: "scuro",
          tag: "اسپرسو قوی برای لاته",
          intensity: "غلیظ و برشته",
          flavorProfile: "تعادل عالی بین قهوه غلیظ و شیر گرم",
          img: "/images/products/nespresso/main_7933.40.jpg",
          price: "۲,۳۹۰,۰۰۰ تومان",
        },
      ];
    }

    if (finalAnswers.intensity === "strong") {
      return [
        {
          name: "Ispirazione Firenze Arpeggio",
          slug: "arpeggio",
          tag: "پرفروش‌ترین در جهان",
          intensity: "۹ از ۱۳",
          flavorProfile: "روست قوی فلورانسی با بادی متراکم و نت‌های شکلات تلخ",
          img: "/images/products/nespresso/main_7870.40.jpg",
          price: "۱,۹۸۰,۰۰۰ تومان",
        },
        {
          name: "Ispirazione Napoli",
          slug: "ispirazione-napoli",
          tag: "بسیار غلیظ و تلخ",
          intensity: "۱۳ از ۱۳",
          flavorProfile: "روست ناپلی تاریک و کرمای غلیظ برای انرژی بالا",
          img: "/images/products/nespresso/main_7877.40.jpg",
          price: "۱,۹۸۰,۰۰۰ تومان",
        },
        {
          name: "Ispirazione Ristretto Italiano",
          slug: "ristretto",
          tag: "اسپرسو اصیل ایتالیایی",
          intensity: "۱۰ از ۱۳",
          flavorProfile: "ترکیب قدرتمند با نت‌های بری و اسیدیته ظریف",
          img: "/images/products/nespresso/main_7871.40.jpg",
          price: "۱,۹۸۰,۰۰۰ تومان",
        },
      ];
    }

    if (finalAnswers.flavor === "fruity" || finalAnswers.type === "ice") {
      return [
        {
          name: "Master Origin Colombia",
          slug: "colombia",
          tag: "۱۰۰٪ عربیکای دست‌چین کلمبیا",
          intensity: "۶ از ۱۳",
          flavorProfile: "اسیدیته زنده، عطر شراب‌گونه و توت‌های قرمز",
          img: "/images/products/nespresso/main_7891.40.jpg",
          price: "۲,۴۸۰,۰۰۰ تومان",
        },
        {
          name: "Athens Freddo Intenso",
          slug: "athens-freddo-intenso",
          tag: "انتخاب اول قهوه سرد و آیس",
          intensity: "۹ از ۱۳",
          flavorProfile: "عطردار و پرقدرت حتی روی قطعات یخ",
          img: "/images/products/nespresso/main_7980.40.jpg",
          price: "۲,۳۹۰,۰۰۰ تومان",
        },
      ];
    }

    // Default Balanced / Lungo
    return [
      {
        name: "World Explorations Buenos Aires",
        slug: "buenos-aires-lungo",
        tag: "لانگو ملایم و مطبوع",
        intensity: "۴ از ۱۳",
        flavorProfile: "نت‌های پاپ‌کورن شیرین و غلات برشته با فنجان ۱۱۰ml",
        img: "/images/products/nespresso/main_135414.jpg",
        price: "۲,۲۸۰,۰۰۰ تومان",
      },
      {
        name: "Ispirazione Roma",
        slug: "ispirazione-roma",
        tag: "تعادل کامل تلخی و عطر",
        intensity: "۸ از ۱۳",
        flavorProfile: "تعادل دلپذیر نت‌های چوبی و اسیدیته ملایم رمی",
        img: "/images/products/nespresso/main_7877.40.jpg",
        price: "۱,۹۸۰,۰۰۰ تومان",
      },
    ];
  };

  const handleSelect = (field: keyof Answer, val: string) => {
    const nextAnswers = { ...answers, [field]: val };
    setAnswers(nextAnswers);

    if (step < 3) {
      setStep(step + 1);
    } else {
      const res = calculateResult(nextAnswers);
      setResult(res);
      setStep(4);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setResult(null);
    setStep(1);
  };

  return (
    <section className="mx-auto mt-20 max-w-7xl px-4">
      <div className="relative overflow-hidden rounded-3xl border border-latte bg-gradient-to-br from-[#1e140d] via-[#2c1d14] to-[#140b06] p-8 text-white shadow-2xl md:p-12">
        {/* Background glow & coffee cup icon */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-caramel/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-sand/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-caramel/40 bg-caramel/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-caramel">
            راهنمای هوشمند طعم‌شناسی بنسو کافی
          </span>
          <h2 className="mt-3 text-2xl font-black text-cream sm:text-3xl lg:text-4xl">
            قهوه ایده‌آل خودت را پیدا کن ☕
          </h2>
          <p className="mt-2 text-sm text-sand/80">
            با ۳ سوال ساده، ذائقه شخصی‌ات را تحلیل می‌کنیم و مناسب‌ترین کپسول‌های اصیل را به تو پیشنهاد می‌دهیم.
          </p>

          {/* Step 1 */}
          {step === 1 && (
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-center gap-2 text-xs text-caramel">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-caramel text-espresso font-bold">۱</span>
                <span>از ۳ · شدت و گیرایی طعم</span>
              </div>
              <h3 className="mb-6 text-lg font-bold text-white">
                قهوه مورد علاقه‌تان چقدر باید غلیظ و گیرا باشد؟
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => handleSelect("intensity", "mild")}
                  className="group flex flex-col items-start rounded-2xl border border-sand/20 bg-white/5 p-4 text-right transition hover:border-caramel hover:bg-white/10"
                >
                  <span className="text-sm font-bold text-white group-hover:text-caramel">ملایم و سبک (شدت ۴ تا ۶)</span>
                  <span className="mt-1 text-xs text-sand/70">طعم دلپذیر، تلخی کم و عطر گل و میوه</span>
                </button>
                <button
                  onClick={() => handleSelect("intensity", "medium")}
                  className="group flex flex-col items-start rounded-2xl border border-sand/20 bg-white/5 p-4 text-right transition hover:border-caramel hover:bg-white/10"
                >
                  <span className="text-sm font-bold text-white group-hover:text-caramel">متعادل و کلاسیک (شدت ۶ تا ۸)</span>
                  <span className="mt-1 text-xs text-sand/70">تعادل بی‌نقص عطر، بادی متوسط و تلخی کنترل‌شده</span>
                </button>
                <button
                  onClick={() => handleSelect("intensity", "strong")}
                  className="group flex flex-col items-start rounded-2xl border border-sand/20 bg-white/5 p-4 text-right transition hover:border-caramel hover:bg-white/10"
                >
                  <span className="text-sm font-bold text-white group-hover:text-caramel">بسیار پرقدرت و تلخ (شدت ۹ تا ۱۳)</span>
                  <span className="mt-1 text-xs text-sand/70">روست تیره، غلظت سنگین ایتالیایی و بیداری کامل</span>
                </button>
                <button
                  onClick={() => handleSelect("intensity", "decaf")}
                  className="group flex flex-col items-start rounded-2xl border border-sand/20 bg-white/5 p-4 text-right transition hover:border-caramel hover:bg-white/10"
                >
                  <span className="text-sm font-bold text-white group-hover:text-caramel">بدون کافئین (Decaffeinato)</span>
                  <span className="mt-1 text-xs text-sand/70">طعم کامل قهوه اصیل برای نوشیدن در عصر و شب</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-center gap-2 text-xs text-caramel">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-caramel text-espresso font-bold">۲</span>
                <span>از ۳ · نحوه سرو و فنجان</span>
              </div>
              <h3 className="mb-6 text-lg font-bold text-white">
                قهوه‌تان را معمولاً به چه شیوه‌ای می‌نوشید؟
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => handleSelect("type", "espresso")}
                  className="group flex flex-col items-start rounded-2xl border border-sand/20 bg-white/5 p-4 text-right transition hover:border-caramel hover:bg-white/10"
                >
                  <span className="text-sm font-bold text-white group-hover:text-caramel">اسپرسو خالص (۴۰ml)</span>
                  <span className="mt-1 text-xs text-sand/70">یک شات غلیظ، پر از کرما و لایه روغنی قهوه</span>
                </button>
                <button
                  onClick={() => handleSelect("type", "milk")}
                  className="group flex flex-col items-start rounded-2xl border border-sand/20 bg-white/5 p-4 text-right transition hover:border-caramel hover:bg-white/10"
                >
                  <span className="text-sm font-bold text-white group-hover:text-caramel">با شیر (کاپوچینو و لاته)</span>
                  <span className="mt-1 text-xs text-sand/70">ترکیب اسپرسو با فوم مخملی شیر و شیر گرم</span>
                </button>
                <button
                  onClick={() => handleSelect("type", "lungo")}
                  className="group flex flex-col items-start rounded-2xl border border-sand/20 bg-white/5 p-4 text-right transition hover:border-caramel hover:bg-white/10"
                >
                  <span className="text-sm font-bold text-white group-hover:text-caramel">ماگ بزرگ و لانگو (۱۱۰ تا ۲۳۰ml)</span>
                  <span className="mt-1 text-xs text-sand/70">یک فنجان پرحجم برای نوشیدن آرام در حین کار</span>
                </button>
                <button
                  onClick={() => handleSelect("type", "ice")}
                  className="group flex flex-col items-start rounded-2xl border border-sand/20 bg-white/5 p-4 text-right transition hover:border-caramel hover:bg-white/10"
                >
                  <span className="text-sm font-bold text-white group-hover:text-caramel">قهوه سرد و آیس کافی (با یخ)</span>
                  <span className="mt-1 text-xs text-sand/70">خنک، باطراوت و گیرایی بالا حتی در ترکیب با یخ</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-center gap-2 text-xs text-caramel">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-caramel text-espresso font-bold">۳</span>
                <span>از ۳ · نت عطر و طعم</span>
              </div>
              <h3 className="mb-6 text-lg font-bold text-white">
                کدام خانواده از عطرها برای شما وسوسه‌انگیزتر است؟
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => handleSelect("flavor", "chocolate")}
                  className="group flex flex-col items-start rounded-2xl border border-sand/20 bg-white/5 p-4 text-right transition hover:border-caramel hover:bg-white/10"
                >
                  <span className="text-sm font-bold text-white group-hover:text-caramel">🍫 کارامل، شکلات و وانیل</span>
                  <span className="mt-1 text-xs text-sand/70">شیرینی ملایم و عطرهای دسر مانند</span>
                </button>
                <button
                  onClick={() => handleSelect("flavor", "cereal")}
                  className="group flex flex-col items-start rounded-2xl border border-sand/20 bg-white/5 p-4 text-right transition hover:border-caramel hover:bg-white/10"
                >
                  <span className="text-sm font-bold text-white group-hover:text-caramel">🌾 غلات برشته، فندق و بیسکویت</span>
                  <span className="mt-1 text-xs text-sand/70">آرام‌بخش، گرم و روست سنتی کافه‌ای</span>
                </button>
                <button
                  onClick={() => handleSelect("flavor", "fruity")}
                  className="group flex flex-col items-start rounded-2xl border border-sand/20 bg-white/5 p-4 text-right transition hover:border-caramel hover:bg-white/10"
                >
                  <span className="text-sm font-bold text-white group-hover:text-caramel">🍓 میوه‌ای، گلی و ترشی ملایم</span>
                  <span className="mt-1 text-xs text-sand/70">اسپشیالتی، عربیکای ناب خاستگاه‌های آمریکای لاتین</span>
                </button>
                <button
                  onClick={() => handleSelect("flavor", "classic")}
                  className="group flex flex-col items-start rounded-2xl border border-sand/20 bg-white/5 p-4 text-right transition hover:border-caramel hover:bg-white/10"
                >
                  <span className="text-sm font-bold text-white group-hover:text-caramel">☕ روست دودی، ادویه‌ای و تلخ اصیل</span>
                  <span className="mt-1 text-xs text-sand/70">طعم اسپرسوی غلیظ کافه‌های رم و میلان</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && result && (
            <div className="mt-8 animate-fade-in">
              <span className="inline-block text-3xl">🎉</span>
              <h3 className="mt-2 text-xl font-extrabold text-cream">
                طعم اختصاصی شما کشف شد!
              </h3>
              <p className="mt-1 text-xs text-sand/80">
                بر اساس سلیقه انتخابی شما، این کپسول‌ها بیشترین هماهنگی را با ذائقه‌تان دارند:
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {result.map((cap) => (
                  <div
                    key={cap.slug}
                    className="flex flex-col rounded-2xl border border-sand/20 bg-white/10 p-4 text-right backdrop-blur-md"
                  >
                    <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-xl bg-latte/20">
                      <Image
                        src={cap.img}
                        alt={cap.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-caramel">{cap.tag}</span>
                    <h4 className="mt-1 font-extrabold text-white">{cap.name}</h4>
                    <p className="mt-1 text-xs text-sand/70">{cap.flavorProfile}</p>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <span className="text-xs font-bold text-cream">{cap.price}</span>
                      <Link
                        href={`/products/${cap.slug}`}
                        className="rounded-xl bg-caramel px-3 py-1.5 text-xs font-bold text-espresso transition hover:bg-sand"
                      >
                        مشاهده کپسول ←
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  onClick={resetQuiz}
                  className="text-xs font-semibold text-sand/70 underline underline-offset-4 hover:text-white"
                >
                  🔄 انجام دوباره تست سلیقه‌سنجی
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}