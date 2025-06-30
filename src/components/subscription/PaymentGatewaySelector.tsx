
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PaystackCheckout from "@/components/PaystackCheckout";
import { CreditCard, DollarSign } from "lucide-react";

interface PaymentGatewaySelectorProps {
  plan: string;
  email: string;
  onPlanChange: (plan: string, paymentResponse?: any) => Promise<void>;
  onCancel: () => void;
}

const PaymentGatewaySelector: React.FC<PaymentGatewaySelectorProps> = ({
  plan,
  email,
  onPlanChange,
  onCancel
}) => {
  const planPrices = {
    premium: '$10',
    enterprise: '$50'
  };

  const currentPrice = planPrices[plan as keyof typeof planPrices] || '$0';

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <CreditCard className="h-5 w-5" />
          Choose Payment Method
        </CardTitle>
        <p className="text-muted-foreground">
          Upgrading to {plan} plan - {currentPrice}/month
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          <PaystackCheckout
            plan={plan}
            email={email}
            handlePlanChange={onPlanChange}
          />
          
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            disabled
          >
            <DollarSign className="h-4 w-4" />
            Stripe (Coming Soon)
          </Button>
        </div>
        
        <Button
          variant="ghost"
          className="w-full"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentGatewaySelector;
