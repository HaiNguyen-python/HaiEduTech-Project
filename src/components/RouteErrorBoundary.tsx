import { Component, type ReactNode } from "react";
import { AlertTriangle, Home, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

/**
 * Per-route error boundary.
 * Prevents a single page crash from breaking the whole app.
 */
export class RouteErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // Keep visible in console for diagnostics
    // eslint-disable-next-line no-console
    console.error("[RouteErrorBoundary]", error, info?.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="max-w-md w-full text-center space-y-5 rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="mx-auto w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-destructive" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold">Trang gặp sự cố</h1>
            <p className="text-sm text-muted-foreground">
              Đã có lỗi xảy ra khi tải trang này. Bạn có thể thử lại hoặc quay về trang chủ.
            </p>
            {this.state.error?.message ? (
              <p className="text-xs text-muted-foreground/80 font-mono break-all bg-muted/40 rounded px-2 py-1">
                {this.state.error.message.slice(0, 200)}
              </p>
            ) : null}
          </div>
          <div className="flex gap-2 justify-center">
            <Button onClick={this.reset} variant="default" size="sm">
              <RotateCw className="w-4 h-4 mr-2" /> Thử lại
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="/home">
                <Home className="w-4 h-4 mr-2" /> Trang chủ
              </a>
            </Button>
          </div>
        </div>
      </main>
    );
  }
}

export default RouteErrorBoundary;
