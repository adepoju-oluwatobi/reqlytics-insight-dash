import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Activity, Clock, AlertTriangle, CheckCircle, TrendingUp, Globe, LogOut, Key } from "lucide-react";
import { useStatsData } from "@/hooks/useStatsData";
import { useToast } from "@/hooks/use-toast";
import ShowApiKeyDialog from "@/components/ShowApiKeyDialog";

const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState(false);

  const { data: statsData, isLoading, error } = useStatsData(apiKey);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('reqlytics_token');
      const storedApiKey = localStorage.getItem('reqlytics_api_key');

      console.log('Checking auth - Token exists:', !!storedToken);
      console.log('Checking auth - API Key exists:', !!storedApiKey);

      if (!storedToken || !storedApiKey) {
        console.log('No token or API key found, redirecting to login');
        navigate('/login');
        return;
      }

      // For now, trust the stored tokens and proceed to dashboard
      // The useStatsData hook will handle API validation
      console.log('Tokens found, setting authenticated state');
      setIsAuthenticated(true);
      setApiKey(storedApiKey);
    };

    checkAuth();
  }, [navigate]);

  const handleRefresh = () => {
    window.location.reload();
    toast({
      title: "Refreshed",
      description: "Dashboard data has been refreshed",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('reqlytics_api_key');
    localStorage.removeItem('reqlytics_token');
    setIsAuthenticated(false);
    setApiKey("");
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  // Show loading while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show loading state for data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    console.error('Stats data error:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Error Loading Data</CardTitle>
            <CardDescription>
              Failed to fetch dashboard data. Please check your connection or try refreshing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleRefresh} variant="outline" className="w-full">
              Try Again
            </Button>
            <Button onClick={handleLogout} className="w-full">
              Sign In Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const data = statsData?.data;
  if (!data) return null;

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
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Reqlytics Dashboard
            </h1>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowDialog(true)}
                variant="outline"
                size="sm"
              >
                <Key className="h-4 w-4 mr-2" />
                Show API KEY
              </Button>
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">
            Real-time API analytics and monitoring <span className="text-blue-500 underline"><Link to="/guide">Documentation</Link></span>
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
      <ShowApiKeyDialog open={showDialog} onClose={() => setShowDialog(false)} />
    </div>

  );
};

export default Index;
