
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
    };

    checkAuth();
  }, [navigate]);

  const handlePlanChange = async (newPlan: string) => {
    if (newPlan === currentPlan) return;

    setIsLoading(true);
    try {
      // For now, simulate successful plan change since backend endpoint doesn't exist
      // TODO: Replace with actual API call when backend is ready
      console.log(`Simulating plan change to: ${newPlan}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local storage and state
      localStorage.setItem('reqlytics_user_plan', newPlan);
      setCurrentPlan(newPlan);
      
      toast({
        title: "Plan Updated",
        description: `Successfully upgraded to ${newPlan} plan`,
      });
      
      // Redirect to dashboard after successful plan change
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
