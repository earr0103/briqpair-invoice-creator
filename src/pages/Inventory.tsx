import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "@/components/inventory/columns";
import { useInventoryItems } from "@/hooks/useInventoryItems";

const Inventory = () => {
  const { data: items, isLoading } = useInventoryItems();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-content overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
              <p className="text-gray-500">Manage your products and stock</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </header>

          <Card className="p-6">
            {isLoading ? (
              <div className="flex justify-center p-8">Loading...</div>
            ) : (
              <DataTable columns={columns} data={items || []} />
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Inventory;