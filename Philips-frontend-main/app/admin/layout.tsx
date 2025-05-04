// app/admin/layout.tsx
import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-8">Admin</h2>
        <nav className="flex flex-col space-y-4">
          <Link href="/admin" className="text-gray-700 hover:text-gray-900">
            Dashboard
          </Link>
          {/* <Link href="/admin/users" className="text-gray-700 hover:text-gray-900">
            Users
          </Link> */}
        </nav>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
