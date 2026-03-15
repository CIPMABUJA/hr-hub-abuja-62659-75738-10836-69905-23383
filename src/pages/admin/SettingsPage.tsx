import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Bell, Mail, Shield, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BranchInfo {
  name: string; code: string; address: string; phone: string; email: string;
}
interface MembershipFees {
  student: number; associate: number; member: number; fellow: number;
}
interface Notifications {
  new_applications: boolean; payments: boolean; event_registrations: boolean; membership_expiry: boolean; forum_activity: boolean;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
  const [branchInfo, setBranchInfo] = useState<BranchInfo>({ name: "", code: "", address: "", phone: "", email: "" });
  const [fees, setFees] = useState<MembershipFees>({ student: 0, associate: 0, member: 0, fellow: 0 });
  const [notifications, setNotifications] = useState<Notifications>({
    new_applications: true, payments: true, event_registrations: true, membership_expiry: true, forum_activity: false,
  });

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from("settings").select("*");
    if (data) {
      data.forEach((s: any) => {
        if (s.key === "branch_info") setBranchInfo(s.value as unknown as BranchInfo);
        if (s.key === "membership_fees") setFees(s.value as unknown as MembershipFees);
        if (s.key === "notifications") setNotifications(s.value as unknown as Notifications);
      });
    }
    setLoading(false);
  };

  const saveSetting = async (key: string, value: any) => {
    setSaving(key);
    const { error } = await supabase.from("settings").update({ value, updated_at: new Date().toISOString() }).eq("key", key);
    setSaving("");
    if (error) { toast.error("Failed to save"); return; }
    toast.success("Settings saved successfully");
  };

  if (loading) return (
    <DashboardLayout userRole="admin">
      <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">System Settings</h2>
          <p className="text-muted-foreground">Manage system configuration and preferences</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general"><Settings className="mr-2 h-4 w-4" />General</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4" />Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Branch Information</CardTitle>
                <CardDescription>Update branch details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Branch Name</Label>
                    <Input value={branchInfo.name} onChange={e => setBranchInfo(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Branch Code</Label>
                    <Input value={branchInfo.code} onChange={e => setBranchInfo(p => ({ ...p, code: e.target.value }))} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Textarea value={branchInfo.address} onChange={e => setBranchInfo(p => ({ ...p, address: e.target.value }))} rows={3} />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value={branchInfo.phone} onChange={e => setBranchInfo(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" value={branchInfo.email} onChange={e => setBranchInfo(p => ({ ...p, email: e.target.value }))} />
                  </div>
                </div>
                <Button onClick={() => saveSetting("branch_info", branchInfo)} disabled={saving === "branch_info"}>
                  {saving === "branch_info" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Membership Fees</CardTitle>
                <CardDescription>Configure membership categories and fees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {(["student", "associate", "member", "fellow"] as const).map(cat => (
                  <div key={cat} className="space-y-2">
                    <Label>{cat.charAt(0).toUpperCase() + cat.slice(1)} Annual Fee (₦)</Label>
                    <Input type="number" value={fees[cat]} onChange={e => setFees(p => ({ ...p, [cat]: Number(e.target.value) }))} />
                  </div>
                ))}
                <Button onClick={() => saveSetting("membership_fees", fees)} disabled={saving === "membership_fees"}>
                  {saving === "membership_fees" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure system notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {([
                  { key: "new_applications", label: "New Member Applications", desc: "Notify when new members apply" },
                  { key: "payments", label: "Payment Notifications", desc: "Notify on successful payments" },
                  { key: "event_registrations", label: "Event Registrations", desc: "Notify when members register for events" },
                  { key: "membership_expiry", label: "Membership Expiry", desc: "Notify 30 days before expiry" },
                  { key: "forum_activity", label: "Forum Activity", desc: "Notify on new forum posts" },
                ] as const).map(item => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>{item.label}</Label>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch checked={notifications[item.key]} onCheckedChange={v => setNotifications(p => ({ ...p, [item.key]: v }))} />
                  </div>
                ))}
                <Button onClick={() => saveSetting("notifications", notifications)} disabled={saving === "notifications"}>
                  {saving === "notifications" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
