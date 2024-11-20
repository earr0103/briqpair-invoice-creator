import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: number;
  status: "active" | "inactive";
};

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "totalSpent",
    header: "Total Spent",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalSpent"));
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const color = status === "active" ? "text-green-600 bg-green-100" : "text-gray-600 bg-gray-100";
      return (
        <span className={`px-2 py-1 rounded-full text-sm ${color}`}>
          {status}
        </span>
      );
    },
  },
];

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "(555) 123-4567",
    totalSpent: 4599.99,
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "(555) 987-6543",
    totalSpent: 2849.50,
    status: "inactive",
  },
];

const Customers = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-content overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
              <p className="text-gray-500">Manage your customer base</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </header>

          <Card className="p-6">
            <DataTable columns={columns} data={mockCustomers} />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Customers;