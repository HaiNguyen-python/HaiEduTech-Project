/**
 * Agency Admin - private CRM dashboard for the 3 co-founders to track and
 * manage incoming leads submitted from the EdTech Website Design page.
 * Protected by auth + staff role (teacher / admin).
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Loader2, Mail, Phone, Building2, RefreshCw, Lock, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type LeadStatus = "new" | "in_discussion" | "won" | "lost";

interface Lead {
  id: string;
  client_name: string;
  email: string;
  phone: string;
  organization_or_school: string | null;
  selected_package: string | null;
  notes: string | null;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
}

const STATUS_META: Record<LeadStatus, { label: string; cls: string }> = {
  new: { label: "New", cls: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30" },
  in_discussion: { label: "In Discussion", cls: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30" },
  won: { label: "Won", cls: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30" },
  lost: { label: "Lost", cls: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30" },
};

const AgencyAdmin = () => {
  const { user, isSuperAdmin, loading: roleLoading } = useUserRole();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | LeadStatus>("all");

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("agency_leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load leads");
    } else {
      setLeads((data as Lead[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user && isSuperAdmin) fetchLeads();
  }, [user, isSuperAdmin]);

  const updateStatus = async (id: string, status: LeadStatus) => {
    const prev = leads;
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    const { error } = await supabase.from("agency_leads").update({ status }).eq("id", id);
    if (error) {
      setLeads(prev);
      toast.error("Update failed");
    } else {
      toast.success(`Marked as ${STATUS_META[status].label}`);
    }
  };

  const deleteLead = async (id: string) => {
    const prev = leads;
    setLeads((ls) => ls.filter((l) => l.id !== id));
    const { error } = await supabase.from("agency_leads").delete().eq("id", id);
    if (error) {
      setLeads(prev);
      toast.error("Delete failed");
    } else {
      toast.success("Lead deleted");
    }
  };

  // Auth / access gates
  if (roleLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Agency Admin - Login required</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                You must sign in with a co-founder account to access the lead dashboard.
              </p>
              <Button asChild className="w-full">
                <Link to="/login?redirect=/agency-admin">Sign in</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isSuperAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 max-w-md text-center">
          <Lock className="w-10 h-10 text-rose-500 mx-auto mb-3" />
          <h1 className="text-xl font-bold mb-1">Access denied</h1>
          <p className="text-sm text-muted-foreground">
            This dashboard is restricted to co-founder accounts.
          </p>
        </div>
      </div>
    );
  }

  const filtered = leads.filter((l) => {
    if (filterStatus !== "all" && l.status !== filterStatus) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return [l.client_name, l.email, l.phone, l.organization_or_school, l.notes]
      .filter(Boolean)
      .some((v) => (v as string).toLowerCase().includes(q));
  });

  const counts = {
    all: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    in_discussion: leads.filter((l) => l.status === "in_discussion").length,
    won: leads.filter((l) => l.status === "won").length,
    lost: leads.filter((l) => l.status === "lost").length,
  };

  return (
    <div className="admin-workspace min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">
              Co-founders CRM
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold">Agency Lead Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage every consultation request submitted from the EdTech Website Design landing page.
            </p>
          </div>
          <Button onClick={fetchLeads} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-1.5" /> Refresh
          </Button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {(["all", "new", "in_discussion", "won", "lost"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilterStatus(k)}
              className={`text-left rounded-xl border p-3 transition-all ${
                filterStatus === k
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border/70 hover:border-primary/40 bg-card"
              }`}
            >
              <div className="text-[11px] font-semibold uppercase text-muted-foreground">
                {k === "all" ? "All leads" : STATUS_META[k as LeadStatus].label}
              </div>
              <div className="text-2xl font-bold mt-0.5">{counts[k]}</div>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-4">
          <Input
            placeholder="Search by name, email, phone, organization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground text-sm">
                No leads match your filters yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Client</th>
                      <th className="text-left px-4 py-3 font-semibold">Contact</th>
                      <th className="text-left px-4 py-3 font-semibold">Package</th>
                      <th className="hidden text-left px-4 py-3 font-semibold lg:table-cell">Notes</th>
                      <th className="text-left px-4 py-3 font-semibold">Created</th>
                      <th className="text-left px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((l) => (
                      <tr key={l.id} className="border-t border-border/60 hover:bg-muted/30 align-top">
                        <td className="px-4 py-3">
                          <div className="font-semibold text-foreground">{l.client_name}</div>
                          {l.organization_or_school && (
                            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Building2 className="w-3 h-3" /> {l.organization_or_school}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <a href={`mailto:${l.email}`} className="text-xs flex items-center gap-1 text-primary hover:underline">
                            <Mail className="w-3 h-3" /> {l.email}
                          </a>
                          <a href={`tel:${l.phone}`} className="text-xs flex items-center gap-1 mt-0.5 text-foreground/80 hover:underline">
                            <Phone className="w-3 h-3" /> {l.phone}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-xs">
                          <Badge variant="secondary" className="font-mono">
                            {l.selected_package || "-"}
                          </Badge>
                        </td>
                        <td className="hidden px-4 py-3 max-w-[260px] lg:table-cell">
                          <div className="text-xs text-foreground/80 line-clamp-3 whitespace-pre-wrap">
                            {l.notes || <span className="text-muted-foreground italic">No notes</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                          {format(new Date(l.created_at), "yyyy-MM-dd HH:mm")}
                        </td>
                        <td className="px-4 py-3">
                          <Select value={l.status} onValueChange={(v) => updateStatus(l.id, v as LeadStatus)}>
                            <SelectTrigger className={`h-8 text-xs border ${STATUS_META[l.status].cls}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {(Object.keys(STATUS_META) as LeadStatus[]).map((s) => (
                                <SelectItem key={s} value={s}>{STATUS_META[s].label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <Button asChild size="icon" variant="ghost" className="h-8 w-8" title="Email client">
                              <a href={`mailto:${l.email}`}><ExternalLink className="w-3.5 h-3.5" /></a>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete this lead?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently remove {l.client_name}'s submission. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteLead(l.id)}
                                    className="bg-rose-500 hover:bg-rose-600 text-white"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgencyAdmin;
