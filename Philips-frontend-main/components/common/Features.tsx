// components/common/Features.tsx
"use client";

const FEATURES = [
  {
    title: "Smart Healthcare",
    desc: "Connected devices for your well-being.",
    icon: "/icons/health.svg",
  },
  {
    title: "Home Comfort",
    desc: "Air purifiers & kitchen essentials.",
    icon: "/icons/home.svg",
  },
  {
    title: "Personal Care",
    desc: "Grooming & wellness solutions.",
    icon: "/icons/personal-care.svg",
  },
];

export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 text-center">
        {FEATURES.map((f) => (
          <div key={f.title} className="space-y-4">
            <img src={f.icon} alt="" className="mx-auto h-12 w-12" />
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
