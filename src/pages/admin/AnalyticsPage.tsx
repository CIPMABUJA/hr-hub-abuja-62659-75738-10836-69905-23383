import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnalyticsChart from "@/components/admin/AnalyticsChart";
import { Users, TrendingUp, DollarSign, Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    revenue: 0,
    events: 0,
  });
  const [chartData, setChartData] = useState({
    membershipGrowth: [],
    revenueByMonth: [],
    membershipByCategory: [],
    eventAttendance: [],
  });

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    
    // Fetch stats
    const { count: totalMembers } = await supabase
      .from('memberships')
      .select('*', { count: 'exact', head: true });

    const { count: activeMembers } = await supabase
      .from('memberships')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    const { data: payments } = await supabase
      .from('payments')
      .select('amount')
      .eq('status', 'completed');

    const revenue = payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;

    const { count: events } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true });

    setStats({
      totalMembers: totalMembers || 0,
      activeMembers: activeMembers || 0,
      revenue,
      events: events || 0,
    });

    // Fetch chart data
    const { data: membershipData } = await supabase
      .from('memberships')
      .select('created_at, category')
      .order('created_at', { ascending: true });

    // Process membership growth
    const growthByMonth: { [key: string]: number } = {};
    membershipData?.forEach(m => {
      const month = new Date(m.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      growthByMonth[month] = (growthByMonth[month] || 0) + 1;
    });

    const membershipGrowth = Object.entries(growthByMonth).map(([name, value]) => ({
      name,
      members: value,
    }));

    // Process membership by category
    const categoryCount: { [key: string]: number } = {};
    membershipData?.forEach(m => {
      categoryCount[m.category] = (categoryCount[m.category] || 0) + 1;
    });

    const membershipByCategory = Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));

    // Process revenue by month
    const { data: paymentData } = await supabase
      .from('payments')
      .select('amount, payment_date')
      .eq('status', 'completed');

    const revenueByMonth: { [key: string]: number } = {};
    paymentData?.forEach(p => {
      const month = new Date(p.payment_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      revenueByMonth[month] = (revenueByMonth[month] || 0) + Number(p.amount);
    });

    const revenueData = Object.entries(revenueByMonth).map(([name, revenue]) => ({
      name,
      revenue,
    }));

    setChartData({
      membershipGrowth,
      revenueByMonth: revenueData,
      membershipByCategory,
      eventAttendance: [],
    });

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <DashboardLayout userRole="admin">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Analytics & Reporting</h2>
            <p className="text-sm md:text-base text-muted-foreground">Comprehensive insights into branch performance</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMembers}</div>
              <p className="text-xs text-muted-foreground">{stats.activeMembers} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦{stats.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total collected</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.events}</div>
              <p className="text-xs text-muted-foreground">Total events</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
              <p className="text-xs text-muted-foreground">vs last period</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="membership" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="membership">Membership</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="cpd">CPD</TabsTrigger>
          </TabsList>

          <TabsContent value="membership" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <AnalyticsChart
                type="line"
                data={chartData.membershipGrowth}
                title="Membership Growth"
                dataKey="members"
                xAxisKey="name"
              />
              <AnalyticsChart
                type="pie"
                data={chartData.membershipByCategory}
                title="Membership by Category"
                dataKey="value"
              />
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <AnalyticsChart
              type="bar"
              data={chartData.revenueByMonth}
              title="Revenue by Month"
              dataKey="revenue"
              xAxisKey="name"
            />
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">Event analytics will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cpd" className="space-y-4">
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">CPD analytics will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}