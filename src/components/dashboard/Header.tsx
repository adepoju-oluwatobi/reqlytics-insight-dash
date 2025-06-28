import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Key, TrendingUp, LogOut } from "lucide-react";

interface HeaderProps {
  onShowApiKey: () => void;
  onRefresh: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowApiKey, onRefresh, onLogout }) => (
  <div className="text-center space-y-4">
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent sm:text-4xl">
        Reqlytics Dashboard
      </h1>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
        <Button onClick={onShowApiKey} variant="outline" size="sm" className="w-full sm:w-auto">
          <Key className="h-4 w-4 mr-2" />
          Show API Key
        </Button>
        <Button onClick={onRefresh} variant="outline" size="sm" className="w-full sm:w-auto">
          <TrendingUp className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        <Button onClick={onLogout} variant="outline" size="sm" className="w-full sm:w-auto">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
    <p className="text-base text-muted-foreground sm:text-lg">
      Real-time API analytics and monitoring{' '}
      <span className="text-blue-500 underline">
        <Link to="/guide">Documentation</Link>
      </span>
    </p>
  </div>
);

export default Header;