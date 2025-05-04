// components/admin/UsersTable.tsx
"use client";

import React, { useEffect, useState } from "react";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { fetchUsers } from "@/services/api";

interface User {
  id: number;
  name: string;
  email: string;
  signup_date: string;
  feedback_count: number;
}

export default function UsersTable() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => setError(err.message || "Failed to load users"));
  }, []);

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }
  if (!users) {
    return <LoadingSpinner />;
  }

  return (
    <table className="min-w-full bg-white rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2">Signup Date</th>
          <th className="px-4 py-2">Feedback Count</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="border-t">
            <td className="px-4 py-2">{u.id}</td>
            <td className="px-4 py-2">{u.name}</td>
            <td className="px-4 py-2">{u.email}</td>
            <td className="px-4 py-2 text-center">
              {new Date(u.signup_date).toLocaleDateString()}
            </td>
            <td className="px-4 py-2 text-center">{u.feedback_count}</td>
            <td className="px-4 py-2 text-center">
              <button className="text-blue-600 hover:underline">
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
