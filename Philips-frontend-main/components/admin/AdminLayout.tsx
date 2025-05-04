// components/admin/AdminLayout.tsx
"use client";

import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

interface AdminLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export default function AdminLayout({
  children,
  pageTitle = "Admin Dashboard",
}: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header with title */}
        <div className="border-b border-gray-200 bg-white p-4">
          <Header title={pageTitle} />
        </div>

        {/* Page content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
