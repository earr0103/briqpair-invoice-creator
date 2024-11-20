import { useQuery } from "@tanstack/react-query";
import { InventoryItem } from "@/components/inventory/columns";

// This is mock data - in a real app, this would come from your API
const mockItems: InventoryItem[] = [
  {
    id: "1",
    name: "Product A",
    price: 29.99,
    stock: 100,
    sku: "PROD-A-001",
  },
  {
    id: "2",
    name: "Product B",
    price: 49.99,
    stock: 75,
    sku: "PROD-B-002",
  },
  {
    id: "3",
    name: "Product C",
    price: 19.99,
    stock: 150,
    sku: "PROD-C-003",
  },
];

const fetchInventoryItems = async (): Promise<InventoryItem[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockItems), 1000);
  });
};

export const useInventoryItems = () => {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: fetchInventoryItems,
  });
};