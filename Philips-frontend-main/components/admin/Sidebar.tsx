// components/admin/Sidebar.tsx
"use client";

import Link from "next/link";

export default function Sidebar() {
  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/feedback", label: "Feedback" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-8">Admin</h2>
      <nav className="flex flex-col space-y-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-700 hover:text-gray-900">

            {link.label}

          </Link>
        ))}
      </nav>
    </aside>
  );
}
