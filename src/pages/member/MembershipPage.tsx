import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Calendar, CreditCard, Download, RefreshCw, Loader2 } from "lucide-react";
import { useMembership } from "@/hooks/useMembership";
import { format } from "date-fns";

export default function MembershipPage() {
  const { membership, isLoading, daysRemaining, progress } = useMembership();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!membership) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <p className="text-muted-foreground mb-4">You don't have an active membership yet.</p>
              <Button>Apply for Membership</Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'expired': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Membership</h2>
          <p className="text-muted-foreground">Manage your CIPM membership status and renewals</p>
        </div>

        {/* Current Status Card */}
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Current Membership Status</CardTitle>
              <Badge variant={getStatusColor(membership.status)}>
                {membership.status.charAt(0).toUpperCase() + membership.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Membership Category</p>
                <p className="text-xl font-semibold flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  {membership.category.toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Member ID</p>
                <p className="text-xl font-semibold">{membership.member_id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Join Date</p>
                <p className="text-lg font-medium">
                  {format(new Date(membership.join_date), 'MMMM dd, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Expiry Date</p>
                <p className="text-lg font-medium text-primary">
                  {format(new Date(membership.expiry_date), 'MMMM dd, yyyy')}
                </p>
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Membership Period</span>
                <span className="text-sm font-medium">{daysRemaining} days remaining</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Membership Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Membership Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Use of {membership.category.toUpperCase()} designation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Access to all member events</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Networking opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Professional development programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Career advancement support</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Renew Membership
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Membership Certificate
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Update Payment Method
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                View Renewal History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
