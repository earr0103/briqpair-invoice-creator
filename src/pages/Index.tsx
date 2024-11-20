import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { WeeklyStats } from "@/components/WeeklyStats";
import { PaymentDistribution } from "@/components/PaymentDistribution";
import { SalesChart } from "@/components/SalesChart";
import { CustomerMap } from "@/components/CustomerMap";

const Index = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-content overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500">Welcome back to BriqPair</p>
            </div>
            <div className="flex gap-4">
              <select className="px-4 py-2 rounded-lg border border-gray-200">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
          </header>

          <WeeklyStats />
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="dashboard-card">
              <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
              <PaymentDistribution />
            </Card>
            
            <Card className="dashboard-card">
              <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
              <SalesChart />
            </Card>
          </div>

          <Card className="dashboard-card">
            <h2 className="text-lg font-semibold mb-4">Customer Locations</h2>
            <CustomerMap />
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;