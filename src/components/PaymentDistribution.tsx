import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

export const PaymentDistribution = () => {
  const data = [
    { name: "Credit Card", value: 45 },
    { name: "Bank Transfer", value: 30 },
    { name: "Cash", value: 15 },
    { name: "Other", value: 10 },
  ];

  const COLORS = ["#0EA5E9", "#8B5CF6", "#F97316", "#94A3B8"];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};