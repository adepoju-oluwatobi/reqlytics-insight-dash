
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";

interface HeaderProps {
  currentPlan?: string;
}

const Header: React.FC<HeaderProps> = ({ currentPlan = 'free' }) => {
  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'premium':
        return (
          <Badge className="bg-blue-500 text-white">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        );
      case 'enterprise':
        return (
          <Badge className="bg-purple-500 text-white">
            <Crown className="w-3 h-3 mr-1" />
            Enterprise
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Free Plan
          </Badge>
        );
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-4">
        <p className="text-base text-muted-foreground sm:text-lg">
          Real-time API analytics and monitoring{' '}
          <span className="text-blue-500 underline">
            <Link to="/guide">Documentation</Link>
          </span>
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Current Plan:</span>
          {getPlanBadge(currentPlan)}
        </div>
      </div>
    </div>
  );
};

export default Header;
