import { Card } from "@/components/ui/card";
import { FileText, DollarSign, Users } from "lucide-react";

export const WeeklyStats = () => {
  const stats = [
    {
      label: "Total Invoices",
      value: "156",
      change: "+12.5%",
      icon: FileText,
      color: "text-primary-DEFAULT",
    },
    {
      label: "Revenue",
      value: "$12,540",
      change: "+8.2%",
      icon: DollarSign,
      color: "text-accent-purple",
    },
    {
      label: "New Customers",
      value: "24",
      change: "+4.1%",
      icon: Users,
      color: "text-accent-orange",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {stats.map((stat) => (
        <Card key={stat.label} className="stat-card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              <p className="text-green-500 text-sm mt-1">{stat.change}</p>
            </div>
            <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};