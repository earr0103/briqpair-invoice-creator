import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InventoryItem } from "../inventory/columns";

interface ProductSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  searchResults: InventoryItem[];
  isLoading: boolean;
  addToCart: (item: InventoryItem) => void;
}

export const ProductSearch = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleKeyPress,
  searchResults,
  isLoading,
  addToCart,
}: ProductSearchProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search by SKU or product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button 
          onClick={handleSearch}
          variant="secondary"
          className="hover:bg-secondary/80 transition-colors"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        searchResults.length > 0 && (
          <ScrollArea className="h-[400px] rounded-md border p-4">
            <div className="grid grid-cols-1 gap-4">
              {searchResults.map((item) => (
                <Card key={item.id} className="p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                      <p className="text-sm text-gray-500">
                        Stock: {item.stock}
                      </p>
                      <p className="font-medium mt-1 text-primary">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      onClick={() => addToCart(item)}
                      disabled={item.stock === 0}
                      variant="secondary"
                      className="hover:bg-secondary/80 transition-colors"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )
      )}
    </div>
  );
};