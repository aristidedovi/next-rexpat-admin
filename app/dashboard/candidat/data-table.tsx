"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Utilisation de `next/navigation`
import { Candidat } from "@prisma/client";
//import { Badge } from "@/components/ui/badge";
//import { Trash2 } from "lucide-react";

type CandidatData = Omit<Candidat, "createdAt" | "updatedAt">;

// interface GlobalFilter {
//   globalFilter: any
// }

interface DataTableProps<TData, TValue> {
  //columns: ColumnDef<TData, TValue>[];
  data: CandidatData[];
  handleDataChange: (newData: CandidatData[]) => void;
}

export function DataTable<TData, TValue>({
  //columns,
  data,
  handleDataChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [tableData, setTableData] = useState<CandidatData[]>(data);
  //const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState<any>([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  // Omit<User, "id" | "password" | "createdAt" | "updatedAt">

  const columns: ColumnDef<CandidatData>[] = [
    {
      accessorKey: "nom",
      header: "Nom complet",
      cell: ({ row }) => {
        const nom = row.getValue("nom") as string;
        //const prenom = row.getValue("prenom") as string;
        const prenom = row.original.prenom as string;
        return `${nom} ${prenom}`;
      },
    },
    {
      accessorKey: "genre",
      header: "Genre",
    },
    // {
    //   accessorKey: "id",
    //   header: "Id",
    // },
    // {
    //   accessorKey: "role",
    //   header: "Role",
    //   cell: ({ row }) => {
    //     const role = row.getValue("role") as string;
    //     return (
    //       <Badge variant={role === "ADMIN" ? "destructive" : "secondary"}>
    //         {role.toLowerCase()}
    //       </Badge>
    //     );
    //   },
    // },
    // {
    //   accessorKey: "createdAt",
    //   header: "Created At",
    //   cell: ({ row }) => {
    //     return format(new Date(row.getValue("createdAt")), "PPP");
    //   },
    // },
    // {
    //   accessorKey: "action",
    //   header: "Action",
    //   cell: ({ row }) => {
    //     const email = row.getValue("email") as string;
    //     return (
    //       <AlertDialog>
    //         <AlertDialogTrigger asChild>
    //           <Button
    //             variant="link"
    //             size="sm"
    //             onClick={() => setUserToDelete(email)}
    //           >
    //             <Trash2 className="h-5 w-5 mr-3" />
    //           </Button>
    //         </AlertDialogTrigger>
    //         <AlertDialogContent>
    //           <AlertDialogHeader>
    //             <AlertDialogTitle>Confirmer la suppression!</AlertDialogTitle>
    //             <AlertDialogDescription>
    //               Êtes-vous sûr de vouloir supprimer l'utilisateur{" "}
    //               <b>{userToDelete}</b>? Cette action est irréversible.
    //             </AlertDialogDescription>
    //           </AlertDialogHeader>
    //           <AlertDialogFooter>
    //             <AlertDialogCancel>Annuler</AlertDialogCancel>
    //             <AlertDialogAction
    //               onClick={() => handelClickDeleteButton(email)}
    //             >
    //               Supprimer
    //             </AlertDialogAction>
    //           </AlertDialogFooter>
    //         </AlertDialogContent>
    //       </AlertDialog>
    //     );
    //   },
    //   // cell: ({ row }) => {
    //   //   return (
    //   //     <Button
    //   //       variant="link"
    //   //       size="sm"
    //   //       onClick={() => handelClickDeleteButton(row.getValue("email"))}
    //   //       // onClick={(e) => {
    //   //       //   const deleteUser = deteleUserByEmail(row.getValue("email"));
    //   //       //   console.log(deleteUser);
    //   //       // }}
    //   //     >
    //   //       <Trash2 className="h-5 w-5 mr-3" />
    //   //     </Button>
    //   //   );
    //   // },
    // },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    // globalFilterFn: (row, columnIds, filterValue) => {
    //   console.log({ row, columnIds, filterValue });
    //   return true;
    // },

    globalFilterFn: (row, _columnIds, filterValue) => {
      const nom = String(row.getValue("nom")).toLowerCase();
      const prenom = String(row.original.prenom).toLowerCase();
      const searchTerm = String(filterValue).toLowerCase();

      return nom.includes(searchTerm) || prenom.includes(searchTerm);
    },
  });

  //const router = useRouter(); // Initialisez le hook pour naviguer

  // Inside your DataTable component:
  // const handleFilterChange = useCallback(
  //   (value: string) => {
  //     console.log(value);
  //     table.setGlobalFilter((row: any) => {
  //       console.log(row);
  //       //if (!row) return true;
  //       //const nom = (row.nom || "").toLowerCase();
  //       //const prenom = (row.prenom || "").toLowerCase();
  //       const searchTerm = value.toLowerCase();
  //       //return nom.includes(searchTerm) || prenom.includes(searchTerm);
  //     });
  //   },
  //   [table]
  // );

  // const handelClickDeleteButton = async (email: string) => {
  //   // const response = deteleUserByEmail(email);
  //   // console.log(response);
  //   const response = await fetch("/api/users/delete", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email: email }),
  //   });
  //   if (response.ok) {
  //     console.log("Utilisateur supprimer");
  //     // Mettre à jour les données locales
  //     const updatedData = tableData.filter((user) => user.email !== email);
  //     setTableData(updatedData);
  //     handleDataChange(updatedData);
  //     router.refresh(); // Rafraîchir la page pour obtenir les nouvelles données
  //     //setMessage("Utilisateur ajouté avec succès !");
  //     //setFormData({ name: "", email: "", password: "", role: Role.USER });
  //     // Rediriger après le succès
  //     //router.push("/dashboard/users");
  //   } else {
  //     console.log("erreur lors de la suppression");
  //     //setMessage("Erreur lors de l'ajout de l'utilisateur.");
  //   }
  //   setUserToDelete(null);
  // };

  return (
    <div>
      <div className="items-start justify-between sm:flex">
        <div>
          <Input
            //value=""
            value={globalFilter}
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            placeholder="Search..."
            className="max-w-sm"
          />
          {/* <Input
            placeholder="Filter nom..."
            value={(table.getColumn("nom")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("nom")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          /> */}
          {/* <h4 className="text-gray-800 text-xl font-semibold">Team members</h4>
          <p className="mt-2 text-gray-600 text-base sm:text-sm">
            Give your team members access to manage the system.
          </p> */}
        </div>
        <Link
          href="#"
          className="px-5 py-3 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg"
        >
          Nouveau candidat
        </Link>
      </div>
      <div className="flex items-center py-4">
        <div></div>
        <div></div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
