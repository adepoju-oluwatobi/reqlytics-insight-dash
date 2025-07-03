
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { AlertTriangle } from "lucide-react";
import { RequestStatusData } from "@/types";

interface RequestStatusChartProps {
  data: RequestStatusData[];
}

const RequestStatusChart: React.FC<RequestStatusChartProps> = ({ data }) => (
  <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        Request Status Distribution
      </CardTitle>
      <CardDescription>Success vs error breakdown</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [value, 'Requests']} />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default RequestStatusChart;
