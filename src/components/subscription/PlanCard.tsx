
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PlanCardProps {
  plan: {
    id: string;
    name: string;
    price: string;
    period: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    popular?: boolean;
    features: string[];
  };
  currentPlan: string;
  isLoading: boolean;
  onPlanChange: (planId: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, currentPlan, isLoading, onPlanChange }) => {
  const Icon = plan.icon;
  const isCurrentPlan = plan.id === currentPlan;

  return (
    <Card 
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
          onClick={() => onPlanChange(plan.id)}
          // disabled={isCurrentPlan || isLoading}
          disabled
        >
          {isCurrentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
