
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Clock, AlertTriangle, CheckCircle, TrendingUp, XCircle } from "lucide-react";

interface SummaryCardsProps {
  totalRequests: string;
  avgResponseTime: string;
  serverErrors: string;
  clientErrors: string;
  successfulRequests: number;
  errorRate: string;
  successRate: string;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalRequests,
  avgResponseTime,
  serverErrors,
  clientErrors,
  successfulRequests,
  errorRate,
  successRate,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Total Requests</CardTitle>
        <Globe className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-blue-600">{totalRequests}</div>
        <Badge variant="secondary" className="mt-1">
          <TrendingUp className="w-3 h-3 mr-1" />
          Active
        </Badge>
      </CardContent>
    </Card>
    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground">Avg Response Time</CardTitle>
        <Clock className="h-4 w-4 text-cyan-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-cyan-600">{avgResponseTime}ms</div>
        <Badge variant="outline" className="mt-1">Performance</Badge>
      </CardContent>
    </Card>
    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground leading-tight">Server Errors</CardTitle>
        <AlertTriangle className="h-4 w-4 text-red-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-red-600">{serverErrors}</div>
        <Badge variant="destructive" className="mt-1 text-xs">Server Issues</Badge>
      </CardContent>
    </Card>
    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground leading-tight">Client Errors</CardTitle>
        <XCircle className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-orange-600">{clientErrors}</div>
        <Badge variant="outline" className="mt-1 border-orange-200 text-orange-700 text-xs">Client Issues</Badge>
      </CardContent>
    </Card>
    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground leading-tight">Successful Requests</CardTitle>
        <CheckCircle className="h-4 w-4 text-green-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-600">{successfulRequests}</div>
        <Badge variant="outline" className="mt-1 border-green-200 text-green-700 text-xs">{successRate}% Success</Badge>
      </CardContent>
    </Card>
  </div>
);

export default SummaryCards;
