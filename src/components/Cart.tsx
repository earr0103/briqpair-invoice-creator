import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { InventoryItem } from "./inventory/columns";
import { useNavigate } from "react-router-dom";
import { generateInvoice } from "@/lib/invoiceGenerator";

export const Cart = () => {
  const [items, setItems] = useState<(InventoryItem & { quantity: number })[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const removeFromCart = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from cart"
    });
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out",
        variant: "destructive"
      });
      return;
    }

    try {
      // In a real app, this would process payment first
      const invoice = await generateInvoice({
        items,
        total,
        date: new Date().toISOString(),
        status: "paid"
      });

      toast({
        title: "Order successful",
        description: "Your invoice has been generated"
      });

      // Clear cart
      setItems([]);
      
      // Navigate to invoices page
      navigate("/invoices");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process order",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
      </div>
      
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ${item.price} x {item.quantity}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          
          <div className="pt-4 border-t">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};