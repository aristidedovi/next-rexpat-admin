// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { User } from "@prisma/client";
// import { Badge } from "@/components/ui/badge";
// import { format } from "date-fns";

// export const columns: ColumnDef<User>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     accessorKey: "role",
//     header: "Role",
//     cell: ({ row }) => {
//       const role = row.getValue("role") as string;
//       return (
//         <Badge variant={role === "ADMIN" ? "destructive" : "secondary"}>
//           {role.toLowerCase()}
//         </Badge>
//       );
//     },
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Created At",
//     cell: ({ row }) => {
//       return format(new Date(row.getValue("createdAt")), "PPP");
//     },
//   },
// ];
