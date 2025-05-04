// app/admin/page.tsx
import React from "react";
import StatsCard from "@/components/admin/StatsCard";
import FilterControls from "@/components/admin/FilterControls";
import SentimentChart from "@/components/admin/SentimentChart";
import FeedbackTable from "@/components/admin/FeedbackTable";

export default function Page() {
  return (
    <div className="space-y-8">
      {/* Page title */}
      <h1 className="text-3xl font-semibold">Dashboard Overview</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatsCard title="Total Feedback" metric="—" />
        <StatsCard title="Avg. Sentiment" metric="—" />
        <StatsCard title="Completion Rate" metric="—" />
        <StatsCard title="Voice Usage" metric="—" />
      </div>

      {/* Filters */}
      <FilterControls />

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <SentimentChart 
          type="line" 
          title="Submissions Over Time" 
          data={[]}           // will be fetched in the component
        />
        <SentimentChart 
          type="pie" 
          title="Sentiment Distribution" 
          data={[]}           // will be fetched in the component
        />
      </div>

      {/* Recent feedback list */}
      <FeedbackTable 
        data={[]}             // will be fetched in the component
      />
    </div>
  );
}
