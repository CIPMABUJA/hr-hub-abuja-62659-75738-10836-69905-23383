import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus, Edit, Trash2, Eye, Filter, Loader2, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { toast } from "sonner";

export default function MembersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [members, setMembers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appLoading, setAppLoading] = useState(true);
  const [approving, setApproving] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, active: 0, pending: 0, expired: 0 });

  useEffect(() => {
    fetchMembers();
    fetchStats();
    fetchApplications();
  }, []);

  const fetchMembers = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("memberships")
      .select("*, profiles:user_id (first_name, last_name, email)")
      .order("created_at", { ascending: false });
    setMembers(data || []);
    setIsLoading(false);
  };

  const fetchApplications = async () => {
    setAppLoading(true);
    const { data } = await supabase
      .from("applications")
      .select("*")
      .order("submitted_at", { ascending: false });
    setApplications(data || []);
    setAppLoading(false);
  };

  const fetchStats = async () => {
    const [{ count: total }, { count: active }, { count: pending }, { count: expired }] = await Promise.all([
      supabase.from("memberships").select("*", { count: "exact", head: true }),
      supabase.from("memberships").select("*", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("memberships").select("*", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("memberships").select("*", { count: "exact", head: true }).eq("status", "expired"),
    ]);
    setStats({ total: total || 0, active: active || 0, pending: pending || 0, expired: expired || 0 });
  };

  const approveApplication = async (app: any) => {
    setApproving(app.id);
    try {
      // Generate member ID
      const { data: memberIdData, error: rpcError } = await supabase.rpc("generate_member_id");
      if (rpcError) throw rpcError;
      const memberId = memberIdData as string;

      if (!app.user_id) {
        toast.error("Application has no linked user account");
        setApproving(null);
        return;
      }

      // Create membership record
      const { error: memError } = await supabase.from("memberships").insert({
        user_id: app.user_id,
        member_id: memberId,
        category: app.membership_category,
        status: "active",
        expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      });
      if (memError) throw memError;

      // Update application status
      const { error: appError } = await supabase.from("applications").update({
        status: "approved",
        reviewed_at: new Date().toISOString(),
      }).eq("id", app.id);
      if (appError) throw appError;

      toast.success(`Application approved! Member ID: ${memberId}`);
      fetchMembers();
      fetchApplications();
      fetchStats();
    } catch (err: any) {
      toast.error(err.message || "Failed to approve application");
    }
    setApproving(null);
  };

  const rejectApplication = async (appId: string) => {
    const { error } = await supabase.from("applications").update({
      status: "rejected",
      reviewed_at: new Date().toISOString(),
    }).eq("id", appId);
    if (error) { toast.error("Failed to reject application"); return; }
    toast.success("Application rejected");
    fetchApplications();
  };

  const filteredMembers = members.filter(member => {
    const fullName = `${member.profiles?.first_name} ${member.profiles?.last_name}`;
    const matchesSearch = fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.profiles?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.member_id?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || member.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const pendingApps = applications.filter(a => a.status === "pending");

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Members Management</h2>
            <p className="text-muted-foreground">Manage member accounts and applications</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: "Total Members", value: stats.total, color: "" },
            { label: "Active", value: stats.active, color: "text-green-600" },
            { label: "Pending Apps", value: pendingApps.length, color: "text-yellow-600" },
            { label: "Expired", value: stats.expired, color: "text-red-600" },
          ].map(s => (
            <Card key={s.label}>
              <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">{s.label}</CardTitle></CardHeader>
              <CardContent><div className={`text-2xl font-bold ${s.color}`}>{s.value}</div></CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="members">
          <TabsList>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="applications">
              Applications {pendingApps.length > 0 && <Badge variant="destructive" className="ml-2">{pendingApps.length}</Badge>}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="mt-6">
            <Card>
              <CardHeader><CardTitle>Member Directory</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name, email, or member ID..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <Filter className="mr-2 h-4 w-4" /><SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isLoading ? (
                  <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                ) : filteredMembers.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No members found</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Member ID</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMembers.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-medium">{member.profiles?.first_name} {member.profiles?.last_name}</TableCell>
                          <TableCell>{member.profiles?.email}</TableCell>
                          <TableCell className="font-mono text-sm">{member.member_id}</TableCell>
                          <TableCell><Badge variant="outline">{member.category}</Badge></TableCell>
                          <TableCell>
                            <Badge variant={member.status === "active" ? "default" : member.status === "pending" ? "secondary" : "destructive"}>
                              {member.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{member.join_date ? format(new Date(member.join_date), "MMM dd, yyyy") : "—"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="mt-6">
            <Card>
              <CardHeader><CardTitle>Membership Applications</CardTitle></CardHeader>
              <CardContent>
                {appLoading ? (
                  <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                ) : applications.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No applications yet</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium">{app.first_name} {app.last_name}</TableCell>
                          <TableCell>{app.email}</TableCell>
                          <TableCell><Badge variant="outline">{app.membership_category}</Badge></TableCell>
                          <TableCell>
                            <Badge variant={app.status === "approved" ? "default" : app.status === "pending" ? "secondary" : "destructive"}>
                              {app.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{app.submitted_at ? format(new Date(app.submitted_at), "MMM dd, yyyy") : "—"}</TableCell>
                          <TableCell className="text-right">
                            {app.status === "pending" && (
                              <div className="flex justify-end gap-2">
                                <Button size="sm" onClick={() => approveApplication(app)} disabled={approving === app.id}>
                                  {approving === app.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <><CheckCircle className="h-4 w-4 mr-1" />Approve</>}
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => rejectApplication(app.id)}>
                                  <XCircle className="h-4 w-4 mr-1" />Reject
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
