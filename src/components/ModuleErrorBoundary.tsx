"use client";

import React, { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  moduleType?: string;
  moduleKey?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ModuleErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`[ModuleError] ${this.props.moduleType}:`, error, errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      const isDev = process.env.NODE_ENV === "development";
      return (
        <div className="py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-6">
              <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">This section couldn&apos;t load</h3>
            <p className="text-[var(--foreground-muted)] mb-4">The rest of the page should work normally.</p>
            {isDev && this.props.moduleType && (
              <div className="mt-4 p-4 bg-[var(--surface)] rounded-lg border border-[var(--border)] text-left">
                <p className="text-sm font-mono"><span className="text-amber-600">Module:</span> {this.props.moduleType}</p>
                {this.state.error && <p className="text-sm font-mono text-red-500 mt-2">{this.state.error.message}</p>}
              </div>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ModuleErrorBoundary;
