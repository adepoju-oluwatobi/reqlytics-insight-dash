interface LoadingStateProps {
  message: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-muted-foreground">{message}</p>
    </div>
  </div>
);

export default LoadingState;