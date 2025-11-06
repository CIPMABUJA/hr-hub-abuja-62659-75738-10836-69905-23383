import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Users, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function EventsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    setIsLoading(true);
    
    // Fetch all events
    const { data: eventsData } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    // Fetch user registrations
    if (user) {
      const { data: regsData } = await supabase
        .from('event_registrations')
        .select('*, events(*)')
        .eq('user_id', user.id);
      
      setRegistrations(regsData || []);
    }

    setEvents(eventsData || []);
    setIsLoading(false);
  };

  const isRegistered = (eventId: string) => {
    return registrations.some(reg => reg.event_id === eventId);
  };

  const handleRegister = async (eventId: string, eventPrice: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to register for events",
        variant: "destructive",
      });
      return;
    }

    // If event is free, register directly
    if (!eventPrice || eventPrice === 0) {
      const { error } = await supabase
        .from('event_registrations')
        .insert({
          user_id: user.id,
          event_id: eventId,
          payment_status: 'completed',
        });

      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Successfully registered for event",
      });

      fetchData();
    } else {
      // For paid events, redirect to payment
      window.location.href = `/member/events/payment/${eventId}`;
    }
  };

  const upcomingEvents = events.filter(e => new Date(e.event_date) > new Date());
  const pastEvents = events.filter(e => new Date(e.event_date) <= new Date());

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

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
            {upcomingEvents.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <p className="text-muted-foreground">No upcoming events at the moment.</p>
                </CardContent>
              </Card>
            ) : (
              upcomingEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                            <Badge variant="secondary">{event.status}</Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(event.event_date), 'MMM dd, yyyy')}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.capacity && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{event.capacity} capacity</span>
                            </div>
                          )}
                        </div>

                        {event.description && (
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 md:items-end justify-between">
                        {event.price > 0 && (
                          <div className="text-xl font-bold text-primary mb-2">
                            ₦{event.price.toLocaleString()}
                          </div>
                        )}
                        {isRegistered(event.id) ? (
                          <Badge variant="default">Registered</Badge>
                        ) : (
                          <Button onClick={() => handleRegister(event.id, event.price)}>
                            {event.price > 0 ? 'Register & Pay' : 'Register Now'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="registered" className="space-y-4">
            {registrations.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <p className="text-muted-foreground">No registered events yet. Browse upcoming events to register.</p>
                </CardContent>
              </Card>
            ) : (
              registrations.map((reg) => (
                <Card key={reg.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">{reg.events.title}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(reg.events.event_date), 'MMM dd, yyyy')}</span>
                        </div>
                        {reg.events.location && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{reg.events.location}</span>
                          </div>
                        )}
                      </div>
                      <Badge variant="default">Confirmed</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastEvents.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <p className="text-muted-foreground">No past events.</p>
                </CardContent>
              </Card>
            ) : (
              pastEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{format(new Date(event.event_date), 'MMM dd, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
