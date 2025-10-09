import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp, Calendar, BookOpen, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";
import { LogCPDDialog } from "@/components/cpd/LogCPDDialog";

export default function CPDPage() {
  const { user } = useAuth();
  const [cpdActivities, setCpdActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    if (user) {
      fetchCPDRecords();
    }
  }, [user]);

  const fetchCPDRecords = async () => {
    if (!user) return;

    setIsLoading(true);
    const currentYear = new Date().getFullYear();
    const { data, error } = await supabase
      .from('cpd_records')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', `${currentYear}-01-01`)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching CPD records:', error);
    } else {
      setCpdActivities(data || []);
      const total = data?.reduce((sum, record) => sum + Number(record.hours || 0), 0) || 0;
      setTotalPoints(total);
    }
    setIsLoading(false);
  };

  const progress = Math.min(100, (totalPoints / 40) * 100);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">CPD Points</h2>
            <p className="text-muted-foreground">Continuous Professional Development tracking</p>
          </div>
          <LogCPDDialog onCPDLogged={fetchCPDRecords} />
        </div>

        {/* CPD Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total CPD Points (2025)</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{totalPoints}</div>
              <p className="text-xs text-muted-foreground mt-1">of 40 required points</p>
              <Progress value={progress} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activities Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{cpdActivities.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                This year
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Target Date</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">Dec 31, 2025</div>
              <p className="text-xs text-muted-foreground mt-1">{Math.max(0, 40 - totalPoints)} points remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent CPD Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent CPD Activities</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : cpdActivities.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No CPD activities logged yet.</p>
            ) : (
              <div className="space-y-4">
                {cpdActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{activity.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(activity.date), 'MMM dd, yyyy')}
                        </span>
                        {activity.category && <Badge variant="outline">{activity.category}</Badge>}
                      </div>
                      {activity.description && (
                        <p className="text-sm text-muted-foreground mt-2">{activity.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{activity.hours}</div>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* CPD Resources */}
        <Card className="bg-muted">
          <CardHeader>
            <CardTitle>Need More CPD Points?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Explore upcoming workshops, seminars, and self-directed learning opportunities to earn your required CPD points.
            </p>
            <div className="flex gap-3">
              <Button>Browse Events</Button>
              <Button variant="outline">View Resources</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
