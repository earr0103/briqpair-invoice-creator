import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Cart } from "@/components/Cart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useInventoryItems } from "@/hooks/useInventoryItems";
import { InventoryItem } from "@/components/inventory/columns";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: inventoryItems } = useInventoryItems();
  const [searchResults, setSearchResults] = useState<InventoryItem[]>([]);

  const handleSearch = () => {
    if (!searchTerm || !inventoryItems) return;

    const results = inventoryItems.filter(
      (item) =>
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-content overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <header>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-500">Create and manage orders</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Product Search</h2>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Search by SKU or product name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-4">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                        <p className="text-sm text-gray-500">
                          Stock: {item.stock}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Cart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orders;