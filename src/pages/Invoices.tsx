import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type Invoice = {
  id: string;
  number: string;
  customer: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
};

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "number",
    header: "Invoice #",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
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
      const colors = {
        paid: "text-green-600 bg-green-100",
        pending: "text-yellow-600 bg-yellow-100",
        overdue: "text-red-600 bg-red-100",
      };
      return (
        <span className={`px-2 py-1 rounded-full text-sm ${colors[status as keyof typeof colors]}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-001",
    customer: "Acme Corp",
    amount: 1299.99,
    status: "paid",
    date: "2024-02-15",
  },
  {
    id: "2",
    number: "INV-002",
    customer: "Globex Inc",
    amount: 849.50,
    status: "pending",
    date: "2024-02-14",
  },
  {
    id: "3",
    number: "INV-003",
    customer: "Initech",
    amount: 2499.99,
    status: "overdue",
    date: "2024-02-10",
  },
];

const Invoices = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-content overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
              <p className="text-gray-500">Manage your invoices</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
          </header>

          <Card className="p-6">
            <DataTable columns={columns} data={mockInvoices} />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Invoices;