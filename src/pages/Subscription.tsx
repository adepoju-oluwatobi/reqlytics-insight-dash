
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Zap, Building2 } from "lucide-react";
import ShowApiKeyDialog from "@/components/ShowApiKeyDialog";

const Subscription = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '/month',
      icon: Zap,
      color: 'text-gray-600',
      features: [
        '100 API requests per month',
        'Basic analytics',
        'Community support',
        'Standard response time'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$29',
      period: '/month',
      icon: Crown,
      color: 'text-blue-600',
      popular: true,
      features: [
        '1,000 API requests per month',
        'Advanced analytics',
        'Priority support',
        'Real-time monitoring',
        'Custom alerts'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      icon: Building2,
      color: 'text-purple-600',
      features: [
        '5,000 API requests per month',
        'Enterprise analytics',
        '24/7 dedicated support',
        'Custom integrations',
        'Advanced security',
        'SLA guarantees'
      ]
    }
  ];

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('reqlytics_token');
      const storedApiKey = localStorage.getItem('reqlytics_api_key');

      if (!storedToken || !storedApiKey) {
        navigate('/login');
        return;
      }

      setIsAuthenticated(true);
      // TODO: Fetch current user plan from API
    };

    checkAuth();
  }, [navigate]);

  const handlePlanChange = async (newPlan: string) => {
    if (newPlan === currentPlan) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem('reqlytics_token');
      const response = await fetch('/api/user/change-plan', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ plan: newPlan })
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentPlan(newPlan);
        toast({
          title: "Plan Updated",
          description: `Successfully upgraded to ${plans.find(p => p.id === newPlan)?.name} plan`,
        });
        // Redirect to dashboard after successful plan change
        setTimeout(() => navigate('/'), 2000);
      } else {
        throw new Error(data.error || 'Failed to update plan');
      }
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

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">Checking authentication...</div>
    </div>;
  }

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
                Subscription Plans
              </h1>
            </div>
          </header>
          <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Choose Your Plan</h2>
                <p className="text-muted-foreground">
                  Upgrade your plan to unlock more features and higher limits
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  const isCurrentPlan = plan.id === currentPlan;
                  
                  return (
                    <Card 
                      key={plan.id} 
                      className={`relative border-0 shadow-lg bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 ${
                        plan.popular ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                        </div>
                      )}
                      <CardHeader className="text-center pb-4">
                        <div className="flex justify-center mb-2">
                          <Icon className={`h-8 w-8 ${plan.color}`} />
                        </div>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <div className="text-3xl font-bold">
                          {plan.price}
                          <span className="text-base font-normal text-muted-foreground">
                            {plan.period}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className="w-full" 
                          variant={isCurrentPlan ? "outline" : plan.popular ? "default" : "outline"}
                          onClick={() => handlePlanChange(plan.id)}
                          disabled={isCurrentPlan || isLoading}
                        >
                          {isCurrentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
      <ShowApiKeyDialog open={showDialog} onClose={() => setShowDialog(false)} />
    </SidebarProvider>
  );
};

export default Subscription;
