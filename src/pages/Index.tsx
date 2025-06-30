
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStatsData } from "@/hooks/useStatsData";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import Header from "@/components/dashboard/Header";
import SummaryCards from "@/components/dashboard/SummaryCard";
import EndpointUsageTable from "@/components/dashboard/EndpointUsageTable";
import RequestStatusChart from "@/components/dashboard/RequestStatusChart";
import DailyRequestTrend from "@/components/dashboard/DailyRequestTrend";
import LoadingState from "@/components/dashboard/LoadingState";
import ErrorState from "@/components/dashboard/ErrorState";
import Footer from "@/components/dashboard/Footer";
import ShowApiKeyDialog from "@/components/ShowApiKeyDialog";
import { StatsData, EndpointTableData, DailyChartData, RequestStatusData } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAuth, logout as logoutAction } from "@/store/slices/authSlice";
import { useState } from "react";

const Index = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { isAuthenticated, apiKey } = useAppSelector((state) => state.auth);
  const { currentPlan } = useAppSelector((state) => state.subscription);
  const { data: statsData, isLoading, error } = useStatsData(apiKey);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('reqlytics_token');
      const storedApiKey = localStorage.getItem('reqlytics_api_key');

      if (!storedToken || !storedApiKey) {
        navigate('/login');
        return;
      }

      dispatch(setAuth({
        isAuthenticated: true,
        apiKey: storedApiKey,
        token: storedToken
      }));
    };

    checkAuth();
  }, [navigate, dispatch]);

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
    localStorage.removeItem('reqlytics_user_plan');
    dispatch(logoutAction());
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  if (!isAuthenticated) {
    return <LoadingState message="Checking authentication..." />;
  }

  if (isLoading) {
    return <LoadingState message="Loading dashboard data..." />;
  }

  if (error) {
    console.error('Stats data error:', error);
    return <ErrorState onRefresh={handleRefresh} onLogout={handleLogout} />;
  }

  const data = statsData?.data as StatsData['data'];
  if (!data) return null;

  const totalRequests = parseInt(data.summary.total_requests);
  const successfulRequests = totalRequests - parseInt(data.summary.server_errors) - parseInt(data.summary.client_errors);
  const errorRate = ((parseInt(data.summary.server_errors) + parseInt(data.summary.client_errors)) / totalRequests * 100).toFixed(1);

  const endpointTableData: EndpointTableData[] = data.endpoints.map(endpoint => ({
    name: endpoint.endpoint.replace('/api/', ''),
    requests: parseInt(endpoint.total),
    percentage: (parseInt(endpoint.total) / totalRequests) * 100,
    fullEndpoint: endpoint.endpoint,
  }));

  const dailyChartData: DailyChartData[] = data.daily.map(day => ({
    date: new Date(day.day).toLocaleDateString(),
    requests: parseInt(day.total),
  }));

  const requestStatusData: RequestStatusData[] = [
    { name: 'Successful', value: successfulRequests, color: '#10b981' },
    { name: 'Server Errors', value: parseInt(data.summary.server_errors), color: '#ef4444' },
    { name: 'Client Errors', value: parseInt(data.summary.client_errors), color: '#f59e0b' },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar
          onShowApiKey={() => setShowDialog(true)}
          onRefresh={handleRefresh}
          onLogout={handleLogout}
        />
        <SidebarInset>
          <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1 text-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Reqlytics Dashboard
              </h1>
            </div>
          </header>
          <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
              <Header currentPlan={currentPlan} />
              <SummaryCards
                totalRequests={data.summary.total_requests}
                avgResponseTime={data.summary.avg_response_time}
                serverErrors={data.summary.server_errors}
                successfulRequests={successfulRequests}
                errorRate={errorRate}
                successRate={((successfulRequests / totalRequests) * 100).toFixed(1)}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EndpointUsageTable data={endpointTableData} />
                <RequestStatusChart data={requestStatusData} />
              </div>
              <DailyRequestTrend data={dailyChartData} />
              <Footer />
            </div>
          </div>
        </SidebarInset>
      </div>
      <ShowApiKeyDialog open={showDialog} onClose={() => setShowDialog(false)} />
    </SidebarProvider>
  );
};

export default Index;
