import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";

type Payment = {
  id: string;
  invoiceNumber: string;
  customer: string;
  amount: number;
  method: string;
  date: string;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "invoiceNumber",
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
    accessorKey: "method",
    header: "Payment Method",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

const mockPayments: Payment[] = [
  {
    id: "1",
    invoiceNumber: "INV-001",
    customer: "Acme Corp",
    amount: 1299.99,
    method: "Credit Card",
    date: "2024-02-15",
  },
  {
    id: "2",
    invoiceNumber: "INV-002",
    customer: "Globex Inc",
    amount: 849.50,
    method: "Bank Transfer",
    date: "2024-02-14",
  },
];

const Payments = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-content overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <header>
            <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
            <p className="text-gray-500">Track all payment transactions</p>
          </header>

          <Card className="p-6">
            <DataTable columns={columns} data={mockPayments} />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Payments;