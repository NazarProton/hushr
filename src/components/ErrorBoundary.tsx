import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('❌ Application Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="bg-black border-[0.5px] border-white rounded-lg p-8 max-w-md w-full text-center">
            <h1 className="text-white text-xl font-bold mb-4">
              Something went wrong
            </h1>
            <p className="text-white text-sm mb-4">
              The application encountered an error. Please check the console for
              details.
            </p>
            <div className="text-white text-xs bg-black p-3 rounded border-[0.5px] border-white mb-4 text-left overflow-auto">
              <strong>Error:</strong>{' '}
              {this.state.error?.message || 'Unknown error'}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
