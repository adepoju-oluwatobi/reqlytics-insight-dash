
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Activity, Clock, AlertTriangle, CheckCircle, TrendingUp, Globe } from "lucide-react";

// Mock data based on your API structure
const mockData = {
  success: true,
  data: {
    summary: {
      total_requests: "25",
      avg_response_time: "312.60",
      server_errors: "9",
      client_errors: "3"
    },
    endpoints: [
      {
        endpoint: "/api/dashboard",
        total: "14"
      },
      {
        endpoint: "/api/test_details",
        total: "8"
      },
      {
        endpoint: "/api/test_details/12",
        total: "2"
      },
      {
        endpoint: "/api/login",
        total: "1"
      }
    ],
    daily: [
      {
        day: "2025-06-24T23:00:00.000Z",
        total: "25"
      }
    ]
  }
};

const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

const Index = () => {
  const [data, setData] = useState(mockData.data);

  // Transform endpoints data for charts
  const endpointChartData = data.endpoints.map(endpoint => ({
    name: endpoint.endpoint.replace('/api/', ''),
    requests: parseInt(endpoint.total),
    fullEndpoint: endpoint.endpoint
  }));

  // Transform daily data for line chart
  const dailyChartData = data.daily.map(day => ({
    date: new Date(day.day).toLocaleDateString(),
    requests: parseInt(day.total)
  }));

  const totalRequests = parseInt(data.summary.total_requests);
  const successfulRequests = totalRequests - parseInt(data.summary.server_errors) - parseInt(data.summary.client_errors);
  const errorRate = ((parseInt(data.summary.server_errors) + parseInt(data.summary.client_errors)) / totalRequests * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Reqlytics Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Real-time API analytics and monitoring
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Requests
              </CardTitle>
              <Globe className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{data.summary.total_requests}</div>
              <Badge variant="secondary" className="mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Response Time
              </CardTitle>
              <Clock className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-600">{data.summary.avg_response_time}ms</div>
              <Badge variant="outline" className="mt-1">
                Performance
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Server Errors
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{data.summary.server_errors}</div>
              <Badge variant="destructive" className="mt-1">
                {errorRate}% Error Rate
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Successful Requests
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{successfulRequests}</div>
              <Badge variant="outline" className="mt-1 border-green-200 text-green-700">
                {((successfulRequests / totalRequests) * 100).toFixed(1)}% Success
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Endpoints Bar Chart */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Endpoint Usage
              </CardTitle>
              <CardDescription>
                Requests per endpoint breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={endpointChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(label, payload) => {
                      const item = payload?.[0]?.payload;
                      return item?.fullEndpoint || label;
                    }}
                    formatter={(value) => [value, 'Requests']}
                  />
                  <Bar dataKey="requests" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Error Distribution Pie Chart */}
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Request Status Distribution
              </CardTitle>
              <CardDescription>
                Success vs error breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Successful', value: successfulRequests, color: '#10b981' },
                      { name: 'Server Errors', value: parseInt(data.summary.server_errors), color: '#ef4444' },
                      { name: 'Client Errors', value: parseInt(data.summary.client_errors), color: '#f59e0b' }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[{ color: '#10b981' }, { color: '#ef4444' }, { color: '#f59e0b' }].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Daily Requests Line Chart */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Daily Request Trend
            </CardTitle>
            <CardDescription>
              Request volume over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyChartData}>
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

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Reqlytics Dashboard - Real-time API Analytics</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
