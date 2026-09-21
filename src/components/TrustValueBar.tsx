export default function TrustValueBar() {
  const values = [
    {
      icon: "⚡",
      title: "تحویل فوری ۲ ساعته مشهد",
      desc: "ارسال اکسپرس و امکان پرداخت در محل",
    },
    {
      icon: "🛡️",
      title: "۱۸ ماه گارانتی بنسو کافی",
      desc: "ضمانت تعویض و خدمات تخصصی دستگاه‌ها",
    },
    {
      icon: "☕",
      title: "تست رایگان طعم در کافه",
      desc: "میز تیستینگ کپسول در کانسپت‌استور مشهد",
    },
    {
      icon: "✔",
      title: "ضمانت اصالت ۱۰۰٪ بار اروپا",
      desc: "واردات مستقیم و تاریخ انقضای کاملاً معتبر",
    },
  ];

  return (
    <section className="mt-16 border-y border-sand/70 bg-white/70 py-8 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-latte text-xl text-caramel">
              {v.icon}
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-espresso">{v.title}</h4>
              <p className="mt-0.5 text-xs text-taiga">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
