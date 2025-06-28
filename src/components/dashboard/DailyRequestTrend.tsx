import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";
import { DailyChartData } from "@/types";

interface DailyRequestTrendProps {
  data: DailyChartData[];
}

const DailyRequestTrend: React.FC<DailyRequestTrendProps> = ({ data }) => (
  <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-green-500" />
        Daily Request Trend
      </CardTitle>
      <CardDescription>Request volume over time</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="requests"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default DailyRequestTrend;