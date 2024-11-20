import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { StockManager } from "./StockManager";

export type InventoryItem = {
  id: string;
  name: string;
  price: number;
  stock: number;
  sku: string;
};

export const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return formatted;
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    id: "stock-management",
    header: "Stock Management",
    cell: ({ row }) => {
      return <StockManager item={row.original} onUpdate={(id, newStock) => {
        // In a real app, this would update the database
        console.log(`Updating stock for ${id} to ${newStock}`);
      }} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { toast } = useToast();
      
      const handleAddToCart = () => {
        toast({
          title: "Added to cart",
          description: `${row.original.name} has been added to your cart`
        });
      };

      return (
        <Button variant="ghost" size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      );
    },
  },
];