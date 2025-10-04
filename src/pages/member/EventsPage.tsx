import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "HR Technology & Innovation Summit 2024",
    date: "May 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Transcorp Hilton, Abuja",
    attendees: 250,
    registered: false,
    cpdPoints: 12,
    type: "Conference",
  },
  {
    id: 2,
    title: "Employee Engagement Best Practices Workshop",
    date: "May 22, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "CIPM Secretariat, Abuja",
    attendees: 50,
    registered: true,
    cpdPoints: 6,
    type: "Workshop",
  },
  {
    id: 3,
    title: "Compensation & Benefits Seminar",
    date: "June 5, 2024",
    time: "10:00 AM - 1:00 PM",
    location: "Virtual (Zoom)",
    attendees: 100,
    registered: false,
    cpdPoints: 4,
    type: "Seminar",
  },
];

const pastEvents = [
  {
    id: 1,
    title: "Leadership in HR Management Workshop",
    date: "Mar 15, 2024",
    attended: true,
    cpdPoints: 8,
  },
  {
    id: 2,
    title: "Annual HR Conference 2024",
    date: "Feb 20, 2024",
    attended: true,
    cpdPoints: 12,
  },
];

export default function EventsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Events</h2>
          <p className="text-muted-foreground">Discover and register for professional development events</p>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="registered">My Registrations</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                        <Badge variant="secondary">{event.cpdPoints} CPD Points</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 md:items-end justify-between">
                      {event.registered ? (
                        <>
                          <Badge variant="default">Registered</Badge>
                          <div className="flex flex-col gap-2">
                            <Button variant="outline">View Details</Button>
                            <Button variant="ghost">Cancel Registration</Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div />
                          <Button>Register Now</Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="registered" className="space-y-4">
            {upcomingEvents.filter(e => e.registered).map((event) => (
              <Card key={event.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{event.title}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge variant="default">Confirmed</Badge>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Event Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {upcomingEvents.filter(e => e.registered).length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <p className="text-muted-foreground">No registered events yet. Browse upcoming events to register.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge variant={event.attended ? "default" : "secondary"}>
                        {event.attended ? "Attended" : "Did Not Attend"}
                      </Badge>
                      {event.attended && (
                        <div className="text-sm text-muted-foreground">
                          {event.cpdPoints} CPD Points Earned
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
