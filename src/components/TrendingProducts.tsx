import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { InventoryItem } from "./inventory/columns";

export const TrendingProducts = () => {
  const { data: trendingProducts, isLoading } = useQuery({
    queryKey: ["trending-products"],
    queryFn: async () => {
      // This would be an API call in a real app
      return [
        { id: "1", name: "Product A", sales: 150, growth: "+25%", price: 29.99 },
        { id: "2", name: "Product B", sales: 120, growth: "+15%", price: 49.99 },
        { id: "3", name: "Product C", sales: 100, growth: "+10%", price: 19.99 },
        { id: "4", name: "Product D", sales: 90, growth: "+8%", price: 39.99 },
        { id: "5", name: "Product E", sales: 80, growth: "+5%", price: 59.99 },
      ];
    },
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading trending products...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trendingProducts?.map((product) => (
        <Card key={product.id} className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.sales} sales this week</p>
              <p className="text-sm font-medium">${product.price}</p>
            </div>
            <div className="flex items-center text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{product.growth}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};