//import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { getUsers } from "@/lib/api/users";
import { DataTable } from "./data-table";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users} />
    </div>
  );
}
