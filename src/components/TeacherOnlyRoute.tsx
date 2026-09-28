import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useUserRole } from "@/hooks/useUserRole";

/** Private study areas (Finnish, Swedish) visible only to teacher/admin accounts. */
export default function TeacherOnlyRoute({ children }: { children: ReactNode }) {
  const { isSuperAdmin, loading } = useUserRole();
  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!isSuperAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
}
