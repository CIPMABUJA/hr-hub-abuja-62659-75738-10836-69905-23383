import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Plus, TrendingUp, Calendar, BookOpen } from "lucide-react";

const cpdActivities = [
  {
    id: 1,
    title: "Leadership in HR Management Workshop",
    date: "Mar 15, 2024",
    points: 8,
    category: "Workshop",
    status: "Approved",
  },
  {
    id: 2,
    title: "Annual HR Conference Attendance",
    date: "Feb 20, 2024",
    points: 12,
    category: "Conference",
    status: "Approved",
  },
  {
    id: 3,
    title: "HR Analytics & Data-Driven Decision Making",
    date: "Jan 18, 2024",
    points: 6,
    category: "Seminar",
    status: "Pending",
  },
];

export default function CPDPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">CPD Points</h2>
            <p className="text-muted-foreground">Continuous Professional Development tracking</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Log CPD Activity
          </Button>
        </div>

        {/* CPD Progress Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total CPD Points (2024)</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">26</div>
              <p className="text-xs text-muted-foreground mt-1">of 40 required points</p>
              <Progress value={65} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activities Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                3 this quarter
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Target Date</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">Dec 31, 2024</div>
              <p className="text-xs text-muted-foreground mt-1">14 points remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* CPD Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Annual CPD Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Professional Workshops</p>
                  <p className="text-sm text-muted-foreground">Minimum 15 points</p>
                </div>
                <div className="text-right">
                  <Badge variant="default">16 points earned</Badge>
                </div>
              </div>
              <Progress value={100} className="h-2" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Conferences & Seminars</p>
                  <p className="text-sm text-muted-foreground">Minimum 10 points</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">10 points earned</Badge>
                </div>
              </div>
              <Progress value={100} className="h-2" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Self-Directed Learning</p>
                  <p className="text-sm text-muted-foreground">Minimum 15 points</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline">0 points earned</Badge>
                </div>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent CPD Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent CPD Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cpdActivities.map((activity) => (
                <div key={activity.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{activity.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {activity.date}
                      </span>
                      <Badge variant="outline">{activity.category}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{activity.points}</div>
                    <p className="text-xs text-muted-foreground">points</p>
                    <Badge variant={activity.status === "Approved" ? "default" : "secondary"} className="mt-2">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
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
