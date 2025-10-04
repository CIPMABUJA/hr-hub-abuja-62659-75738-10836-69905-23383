import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, Award, Users, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function MemberDashboard() {
  // Mock data - will be replaced with real data later
  const membershipStatus = "Active";
  const cpdPoints = 45;
  const upcomingEvents = [
    { id: 1, title: "HR Summit 2025", date: "March 15, 2025", status: "Registered" },
    { id: 2, title: "Leadership Masterclass", date: "March 28, 2025", status: "Available" },
  ];

  const recentPayments = [
    { id: 1, description: "Annual Membership Dues", amount: "₦50,000", date: "Jan 15, 2025", status: "Paid" },
    { id: 2, description: "CPD Workshop", amount: "₦15,000", date: "Feb 10, 2025", status: "Paid" },
  ];

  return (
    <DashboardLayout userRole="member">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold text-foreground">Welcome Back, John!</h2>
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
              <div className="text-2xl font-bold">{membershipStatus}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Renews: Dec 31, 2025
              </p>
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
                55 points to target
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
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground mt-1">
                Events this month
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
              <div className="text-2xl font-bold">₦65,000</div>
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
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                  <Badge variant={event.status === "Registered" ? "default" : "secondary"}>
                    {event.status}
                  </Badge>
                </div>
              ))}
            </div>
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
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium">{payment.description}</h4>
                      <p className="text-sm text-muted-foreground">{payment.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{payment.amount}</p>
                    <Badge variant="secondary" className="mt-1">
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
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
                  <span>Renew Membership</span>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4" asChild>
              <Link to="/member/events">
                <div className="flex flex-col items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  <span>Register for Event</span>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4" asChild>
              <Link to="/member/resources">
                <div className="flex flex-col items-center gap-2">
                  <Users className="h-6 w-6" />
                  <span>Browse Resources</span>
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
