// components/common/Newsletter.tsx
"use client";

export default function Newsletter() {
  return (
    <section className="py-16 bg-[#005EB8] text-white">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-2xl font-bold">Stay up to date</h2>
        <p className="mt-2">
          Sign up for exclusive offers, early product previews, and healthy living tips.
        </p>
        <form className="mt-6 flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 p-3 rounded text-gray-900"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-[#005EB8] font-semibold rounded hover:bg-gray-100 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
