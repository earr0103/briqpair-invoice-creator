import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Cart } from "@/components/Cart";
import { ProductSearch } from "./ProductSearch";
import { useInventoryItems } from "@/hooks/useInventoryItems";
import { InventoryItem } from "../inventory/columns";
import { useToast } from "@/components/ui/use-toast";

export const OrdersContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: inventoryItems, isLoading } = useInventoryItems();
  const [searchResults, setSearchResults] = useState<InventoryItem[]>([]);
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<(InventoryItem & { quantity: number })[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    setIsDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="p-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mb-4 bg-primary hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Add Products
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle>Search Products</DialogTitle>
            </DialogHeader>
            <ProductSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
              handleKeyPress={handleKeyPress}
              searchResults={searchResults}
              isLoading={isLoading}
              addToCart={addToCart}
            />
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          {selectedItems.map((item) => (
            <Card key={item.id} className="p-4 hover:bg-accent/50 transition-colors">
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
                    className="hover:bg-destructive/10 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
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
                    className="hover:bg-primary/10 transition-colors"
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
  );
};