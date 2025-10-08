import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import eventsHero from "@/assets/events-hero.jpg";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "upcoming")
      .order("event_date", { ascending: true });

    if (error) {
      toast.error("Failed to load events");
      return;
    }

    setEvents(data || []);
    setLoading(false);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={eventsHero} alt="CIPM Events" className="w-full h-full object-cover" />
            <div className="absolute inset-0 gradient-overlay" />
          </div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Events & Trainings
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Join our world-class programs and connect with HR professionals
            </p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Upcoming Events</h2>
              <p className="text-lg text-muted-foreground">
                Register now and earn CPD points for your professional development
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {loading ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  Loading events...
                </div>
              ) : events.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No upcoming events at the moment. Check back soon!
                </div>
              ) : (
                events.map((event) => (
                  <Card key={event.id} className="shadow-medium hover:shadow-strong transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                          Event
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full">
                          {event.status}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(event.event_date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location || event.venue || "TBA"}</span>
                        </div>
                        {event.capacity && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{event.capacity} participants</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-foreground mb-4 line-clamp-3">{event.description}</p>
                      
                      <Button variant="default" className="w-full">
                        Register Now
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>


        {/* CPD Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto shadow-strong bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                  Earn CPD Points
                </h2>
                <p className="text-lg mb-6 opacity-90 text-center">
                  All our events contribute to your Continuous Professional Development requirements. 
                  Members earn CPD points upon completion of each program.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold mb-1">20+</div>
                    <div className="text-sm opacity-80">CPD Points per Conference</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">10+</div>
                    <div className="text-sm opacity-80">CPD Points per Workshop</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">5+</div>
                    <div className="text-sm opacity-80">CPD Points per Webinar</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stay Updated on Events
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Become a member to get early access to event registrations and exclusive programs
            </p>
            <Button variant="default" size="lg">
              Join CIPM Abuja
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}