"use client";

import { DataTable } from "./data-table";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<
    Omit<User, "id" | "password" | "createdAt" | "updatedAt">[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDataChange = (
    newData: Omit<User, "id" | "password" | "createdAt" | "updatedAt">[]
  ) => {
    setUsers(newData);
  };

  const getAllUsers = async () => {
    try {
      const response = await fetch("/api/users/list");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable handleDataChange={handleDataChange} data={users} />
    </div>
  );
}
