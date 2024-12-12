import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserCount } from "@/lib/api/users";
import { Users } from "lucide-react";

export default async function DashboardPage() {
  const userCount = await getUserCount();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}