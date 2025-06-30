
import { useState } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import ShowApiKeyDialog from "@/components/ShowApiKeyDialog";
import PlanCard from "@/components/subscription/PlanCard";
import PaymentGatewaySelector from "@/components/subscription/PaymentGatewaySelector";
import { useSubscription } from "@/hooks/useSubscription";
import { subscriptionPlans } from "@/data/subscriptionPlans";

const Subscription = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>(localStorage.getItem('user_email')); // This should come from your auth system
  
  const {
    isAuthenticated,
    currentPlan,
    isLoading,
    handlePlanChange,
    handleRefresh,
    handleLogout,
  } = useSubscription();

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">Checking authentication...</div>
    </div>;
  }

  const handlePlanSelection = (planId: string) => {
    if (planId === 'free') {
      // Free plan doesn't require payment
      handlePlanChange(planId);
    } else {
      // Paid plans require payment gateway selection
      setSelectedPlan(planId);
    }
  };

  const handlePaymentComplete = async (plan: string, paymentResponse?: any) => {
    await handlePlanChange(plan, paymentResponse);
    setSelectedPlan(null);
  };

  const handlePaymentCancel = () => {
    setSelectedPlan(null);
  };

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
            <div className="flex-1 flex items-center justify-center gap-3">
              <img 
                src="/lovable-uploads/5d84e1de-6b24-4fbb-b394-629addedecdb.png" 
                alt="Reqlytics Logo" 
                className="w-8 h-8"
              />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Subscription Plans
              </h1>
            </div>
          </header>
          <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-6xl mx-auto space-y-8">
              {selectedPlan ? (
                <div className="max-w-md mx-auto">
                  <PaymentGatewaySelector
                    plan={selectedPlan}
                    email={userEmail}
                    onPlanChange={handlePaymentComplete}
                    onCancel={handlePaymentCancel}
                  />
                </div>
              ) : (
                <>
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold">Choose Your Plan</h2>
                    <p className="text-muted-foreground">
                      Upgrade your plan to unlock more features and higher limits
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {subscriptionPlans.map((plan) => (
                      <PlanCard
                        key={plan.id}
                        plan={plan}
                        currentPlan={currentPlan}
                        isLoading={isLoading}
                        onPlanChange={handlePlanSelection}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </SidebarInset>
      </div>
      <ShowApiKeyDialog open={showDialog} onClose={() => setShowDialog(false)} />
    </SidebarProvider>
  );
};

export default Subscription;
