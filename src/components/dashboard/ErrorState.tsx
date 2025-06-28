import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  onRefresh: () => void;
  onLogout: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ onRefresh, onLogout }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-red-600">Error Loading Data</CardTitle>
        <CardDescription>
          Failed to fetch dashboard data. Please check your connection or try refreshing.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={onRefresh} variant="outline" className="w-full">
          Try Again
        </Button>
        <Button onClick={onLogout} className="w-full">
          Sign In Again
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default ErrorState;