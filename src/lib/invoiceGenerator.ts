import { InventoryItem } from "@/components/inventory/columns";

type InvoiceItem = InventoryItem & { quantity: number };

interface InvoiceData {
  items: InvoiceItem[];
  total: number;
  date: string;
  status: "paid" | "pending" | "overdue";
}

// In a real app, this would be stored in a database
let invoices: any[] = [];

export const generateInvoice = async (data: InvoiceData) => {
  const invoice = {
    id: Math.random().toString(36).substr(2, 9),
    number: `INV-${Date.now()}`,
    customer: "Sample Customer", // In a real app, this would come from user context
    ...data
  };

  invoices.push(invoice);
  return invoice;
};

export const getInvoices = () => invoices;