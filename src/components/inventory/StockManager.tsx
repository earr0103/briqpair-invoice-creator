import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { InventoryItem } from "./columns";

interface StockManagerProps {
  item: InventoryItem;
  onUpdate: (id: string, newStock: number) => void;
}

export const StockManager = ({ item, onUpdate }: StockManagerProps) => {
  const [quantity, setQuantity] = useState("");
  const { toast } = useToast();

  const handleStockUpdate = (type: "add" | "remove") => {
    const amount = parseInt(quantity);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    const newStock =
      type === "add" ? item.stock + amount : item.stock - amount;

    if (newStock < 0) {
      toast({
        title: "Invalid operation",
        description: "Stock cannot be negative",
        variant: "destructive",
      });
      return;
    }

    onUpdate(item.id, newStock);
    setQuantity("");
    toast({
      title: "Stock updated",
      description: `${item.name} stock ${type === "add" ? "increased" : "decreased"} by ${amount}`,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        className="w-24"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleStockUpdate("add")}
      >
        Add
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleStockUpdate("remove")}
      >
        Remove
      </Button>
    </div>
  );
};