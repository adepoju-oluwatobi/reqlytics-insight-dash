import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "@/base_url";

export const useSubscription = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('reqlytics_token');
      const storedApiKey = localStorage.getItem('reqlytics_api_key');
      const storedPlan = localStorage.getItem('reqlytics_user_plan');

      if (!storedToken || !storedApiKey) {
        navigate('/login');
        return;
      }

      setIsAuthenticated(true);
      setCurrentPlan(storedPlan || 'free');

      // Fetch current plan from backend
      try {
        const response = await fetch(`${BASE_URL}/api/v1/subscribe/plan`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`,
          },
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Non-JSON response:', text);
          throw new Error(`Server returned non-JSON response (HTTP ${response.status})`);
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Failed to fetch plan (HTTP ${response.status})`);
        }
        setCurrentPlan(data.data.plan);
      } catch (error) {
        console.error('Fetch plan error:', error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch plan",
          variant: "destructive",
        });
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const handlePlanChange = async (newPlan: string) => {
    if (newPlan === currentPlan) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem('reqlytics_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${BASE_URL}/api/v1/subscribe/change-plan`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: newPlan }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error(`Server returned non-JSON response (HTTP ${response.status})`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Failed to update plan (HTTP ${response.status})`);
      }

      localStorage.setItem('reqlytics_user_plan', newPlan);
      setCurrentPlan(newPlan);

      toast({
        title: "Plan Updated",
        description: `Successfully upgraded to ${newPlan} plan`,
      });

      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Plan change error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update plan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
    toast({
      title: "Refreshed",
      description: "Page has been refreshed",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('reqlytics_api_key');
    localStorage.removeItem('reqlytics_token');
    localStorage.removeItem('reqlytics_user_plan');
    setIsAuthenticated(false);
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return {
    isAuthenticated,
    currentPlan,
    isLoading,
    handlePlanChange,
    handleRefresh,
    handleLogout,
  };
};