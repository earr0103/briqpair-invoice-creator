import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { Cart } from "@/components/Cart";

const Orders = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-content overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <header>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-500">Create and manage orders</p>
          </header>

          <div className="grid grid-cols-1 gap-8">
            <Cart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orders;