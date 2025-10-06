import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, Award, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useMembership } from "@/hooks/useMembership";
import { format } from "date-fns";

export default function MemberDashboard() {
  const { user } = useAuth();
  const { membership } = useMembership();
  const [cpdPoints, setCpdPoints] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [recentPayments, setRecentPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    setIsLoading(true);

    // Fetch CPD points
    const currentYear = new Date().getFullYear();
    const { data: cpdData } = await supabase
      .from('cpd_records')
      .select('hours')
      .eq('user_id', user.id)
      .gte('date', `${currentYear}-01-01`);

    const totalPoints = cpdData?.reduce((sum, record) => sum + Number(record.hours || 0), 0) || 0;
    setCpdPoints(totalPoints);

    // Fetch upcoming registered events
    const { data: regData } = await supabase
      .from('event_registrations')
      .select('*, events(*)')
      .eq('user_id', user.id)
      .gte('events.event_date', new Date().toISOString())
      .limit(2);

    setUpcomingEvents(regData || []);

    // Fetch recent payments
    const { data: paymentsData } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', user.id)
      .order('payment_date', { ascending: false })
      .limit(2);

    setRecentPayments(paymentsData || []);

    setIsLoading(false);
  };

  const totalPaid = recentPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  if (isLoading) {
    return (
      <DashboardLayout userRole="member">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="member">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Welcome Back, {user?.email?.split('@')[0] || 'Member'}!
          </h2>
          <p className="text-muted-foreground mt-1">Here's what's happening with your membership</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Membership Status
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {membership?.status.charAt(0).toUpperCase() + membership?.status.slice(1) || 'N/A'}
              </div>
              {membership?.expiry_date && (
                <p className="text-xs text-muted-foreground mt-1">
                  Expires: {format(new Date(membership.expiry_date), 'MMM dd, yyyy')}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                CPD Points
              </CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cpdPoints}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.max(0, 40 - cpdPoints)} points to target
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Upcoming Events
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingEvents.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Registered events
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Payments
              </CardTitle>
              <CreditCard className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{totalPaid.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Paid this year
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Events</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/member/events">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No upcoming events registered</p>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.map((reg) => (
                  <div key={reg.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium">{reg.events.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(reg.events.event_date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Registered</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Payments</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/member/payments">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentPayments.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No payment history yet</p>
            ) : (
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium">{payment.description}</h4>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(payment.payment_date), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₦{Number(payment.amount).toLocaleString()}</p>
                      <Badge variant="secondary" className="mt-1">
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4" asChild>
              <Link to="/member/membership">
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle className="h-6 w-6" />
                  <span>View Membership</span>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4" asChild>
              <Link to="/member/events">
                <div className="flex flex-col items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  <span>Browse Events</span>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4" asChild>
              <Link to="/member/cpd">
                <div className="flex flex-col items-center gap-2">
                  <Award className="h-6 w-6" />
                  <span>Log CPD Activity</span>
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
