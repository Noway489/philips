// context/AdminContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

interface AdminContextType {
  pageContextFilter: string;
  setPageContextFilter: (pc: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [pageContextFilter, setPageContextFilter] = useState<string>("");

  return (
    <AdminContext.Provider value={{ pageContextFilter, setPageContextFilter }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminContext() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdminContext must be inside AdminProvider");
  return ctx;
}
