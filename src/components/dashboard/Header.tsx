
import { Link } from "react-router-dom";

const Header: React.FC = () => (
  <div className="text-center space-y-4">
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent sm:text-4xl">
        Reqlytics Dashboard
      </h1>
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
