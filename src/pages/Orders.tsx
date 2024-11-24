import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Cart } from "@/components/Cart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useInventoryItems } from "@/hooks/useInventoryItems";
import { InventoryItem } from "@/components/inventory/columns";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: inventoryItems, isLoading } = useInventoryItems();
  const [searchResults, setSearchResults] = useState<InventoryItem[]>([]);
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<(InventoryItem & { quantity: number })[]>([]);

  const handleSearch = () => {
    if (!searchTerm || !inventoryItems) {
      setSearchResults([]);
      return;
    }

    const results = inventoryItems.filter(
      (item) =>
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (results.length === 0) {
      toast({
        title: "No results found",
        description: "Try searching with a different term",
        variant: "destructive"
      });
    }

    setSearchResults(results);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const addToCart = (item: InventoryItem) => {
    const existingItem = selectedItems.find((i) => i.id === item.id);
    if (existingItem) {
      setSelectedItems(
        selectedItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`
    });
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mb-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Products
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Search Products</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Search by SKU or product name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      <Button onClick={handleSearch}>
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>

                    {isLoading ? (
                      <div className="flex justify-center p-4">Loading...</div>
                    ) : (
                      searchResults.length > 0 && (
                        <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto">
                          {searchResults.map((item) => (
                            <Card key={item.id} className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-medium">{item.name}</h3>
                                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                                  <p className="text-sm text-gray-500">
                                    Stock: {item.stock}
                                  </p>
                                  <p className="font-medium mt-1">
                                    ${item.price.toFixed(2)}
                                  </p>
                                </div>
                                <Button
                                  onClick={() => addToCart(item)}
                                  disabled={item.stock === 0}
                                >
                                  Add to Cart
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              <div className="space-y-4">
                {selectedItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            if (item.quantity > 1) {
                              setSelectedItems(
                                selectedItems.map((i) =>
                                  i.id === item.id
                                    ? { ...i, quantity: i.quantity - 1 }
                                    : i
                                )
                              );
                            } else {
                              setSelectedItems(
                                selectedItems.filter((i) => i.id !== item.id)
                              );
                            }
                          }}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            setSelectedItems(
                              selectedItems.map((i) =>
                                i.id === item.id
                                  ? { ...i, quantity: i.quantity + 1 }
                                  : i
                              )
                            )
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            <Cart items={selectedItems} setItems={setSelectedItems} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orders;