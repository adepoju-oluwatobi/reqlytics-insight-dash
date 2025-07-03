import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
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
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" label={{ position: 'top', formatter: (value: number) => `${value}%` }}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default RequestStatusChart;