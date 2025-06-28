
import { Link } from "react-router-dom";

const Header: React.FC = () => (
  <div className="text-center space-y-4">
    <p className="text-base text-muted-foreground sm:text-lg">
      Real-time API analytics and monitoring{' '}
      <span className="text-blue-500 underline">
        <Link to="/guide">Documentation</Link>
      </span>
    </p>
  </div>
);

export default Header;
