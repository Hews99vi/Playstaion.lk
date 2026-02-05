import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black px-4">
          <div className="max-w-md w-full text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
                System <span className="text-red-500">Malfunction</span>
              </h1>
              <p className="text-white/40 text-xs md:text-sm font-bold uppercase tracking-wider">
                Critical error detected in hardware node
              </p>
            </div>
            {this.state.error && (
              <div className="glass p-6 border border-red-500/20 text-left">
                <p className="text-red-500/80 text-xs font-mono break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary px-8 py-4 text-xs"
              >
                REBOOT SYSTEM
              </button>
              <Link
                to="/"
                className="btn-secondary px-8 py-4 text-xs inline-flex items-center justify-center"
              >
                RETURN TO BASE
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
