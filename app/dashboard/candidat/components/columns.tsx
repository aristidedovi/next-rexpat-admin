"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deteleUserByEmail } from "@/lib/api/users";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <Badge variant={role === "ADMIN" ? "destructive" : "secondary"}>
          {role.toLowerCase()}
        </Badge>
      );
    },
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Created At",
  //   cell: ({ row }) => {
  //     return format(new Date(row.getValue("createdAt")), "PPP");
  //   },
  // },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <Button
          variant="link"
          size="sm"
          // onClick={() => handelClickDeleteButton(row.getValue("email"))}
          // onClick={(e) => {
          //   const deleteUser = deteleUserByEmail(row.getValue("email"));
          //   console.log(deleteUser);
          // }}
        >
          <Trash2 className="h-5 w-5 mr-3" />
        </Button>
      );
    },
  },
];
