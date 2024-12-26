"use client";

import { DataTable } from "./data-table";
import { Candidat } from "@prisma/client";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [candidats, setCandidats] = useState<
    Omit<Candidat, "createdAt" | "updatedAt">[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDataChange = (
    newData: Omit<Candidat, "createdAt" | "updatedAt">[]
  ) => {
    setCandidats(newData);
  };

  const getAllCandidats = async () => {
    try {
      const response = await fetch("/api/candidat/list");

      if (response.ok) {
        const data = await response.json();
        setCandidats(data.candidats);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // };

  useEffect(() => {
    getAllCandidats();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable handleDataChange={handleDataChange} data={candidats} />
    </div>
  );
}
