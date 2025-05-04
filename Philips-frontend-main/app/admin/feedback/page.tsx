// app/admin/feedback/page.tsx
import React from "react";
import FilterControls from "@/components/admin/FilterControls";
import FeedbackTable from "@/components/admin/FeedbackTable";

export default function FeedbackPage() {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <h1 className="text-3xl font-semibold">Feedback Management</h1>

      {/* Filters: date range, pageContext, sentiment */}
      <FilterControls />

      {/* Table of feedback entries */}
      <FeedbackTable />
    </div>
  );
}
