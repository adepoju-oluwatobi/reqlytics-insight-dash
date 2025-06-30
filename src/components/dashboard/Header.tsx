
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Crown, Sparkles, Star } from "lucide-react";

interface HeaderProps {
  currentPlan?: string;
}

const Header: React.FC<HeaderProps> = ({ currentPlan = 'free' }) => {
  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'premium':
        return (
          <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
            <Star className="w-3 h-3 mr-1" />
            Premium Plan
          </Badge>
        );
      case 'enterprise':
        return (
          <Badge className="bg-purple-500 text-white hover:bg-purple-600">
            <Crown className="w-3 h-3 mr-1" />
            Enterprise Plan
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="border-gray-300">
            <Sparkles className="w-3 h-3 mr-1" />
            Free Plan
          </Badge>
        );
    }
  };

  const getPlanDetails = (plan: string) => {
    switch (plan) {
      case 'premium':
        return {
          limits: '5,000 requests/day',
          features: 'Advanced analytics, Priority support'
        };
      case 'enterprise':
        return {
          limits: '10,000 requests/day',
          features: 'Full access, Dedicated support, Custom integrations'
        };
      default:
        return {
          limits: '1,000 requests/month',
          features: 'Basic analytics, Community support'
        };
    }
  };

  const planDetails = getPlanDetails(currentPlan);

  return (
    <div className="text-center space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="text-base text-muted-foreground sm:text-lg">
          Real-time API analytics and monitoring{' '}
          <span className="text-blue-500 underline hover:text-blue-600">
            <Link to="/guide">Documentation</Link>
          </span>
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Current Plan:</span>
            {getPlanBadge(currentPlan)}
          </div>
          
          {currentPlan === 'free' && (
            <Link 
              to="/subscription" 
              className="text-sm text-blue-500 hover:text-blue-600 underline"
            >
              Upgrade Plan
            </Link>
          )}
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">{planDetails.limits}</span> • {planDetails.features}
      </div>
    </div>
  );
};

export default Header;
