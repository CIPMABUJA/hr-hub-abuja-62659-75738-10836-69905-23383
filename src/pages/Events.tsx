import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import eventsHero from "@/assets/events-hero.jpg";

const events = [
  {
    id: 1,
    title: "HR Summit 2025",
    date: "March 15, 2025",
    time: "9:00 AM - 5:00 PM",
    venue: "Transcorp Hilton, Abuja",
    description: "Annual gathering of HR professionals across the FCT featuring keynote speakers, panel discussions, and networking opportunities.",
    capacity: "500 participants",
    status: "Open for Registration",
    type: "Conference",
  },
  {
    id: 2,
    title: "Leadership Masterclass",
    date: "March 28, 2025",
    time: "2:00 PM - 6:00 PM",
    venue: "CIPM Office, Wuse Zone 4",
    description: "Developing strategic leadership skills for HR practitioners. Focus on emotional intelligence, decision-making, and team building.",
    capacity: "50 participants",
    status: "Limited Spaces",
    type: "Workshop",
  },
  {
    id: 3,
    title: "CPD Workshop Series",
    date: "April 5, 2025",
    time: "10:00 AM - 2:00 PM",
    venue: "Online via Zoom",
    description: "Continuous professional development focused on emerging trends in talent management and organizational development.",
    capacity: "Unlimited",
    status: "Open for Registration",
    type: "Webinar",
  },
  {
    id: 4,
    title: "HR Analytics & Data-Driven Decision Making",
    date: "April 18, 2025",
    time: "9:00 AM - 4:00 PM",
    venue: "Sheraton Hotel, Abuja",
    description: "Learn how to leverage HR analytics to make informed strategic decisions and measure organizational impact.",
    capacity: "100 participants",
    status: "Open for Registration",
    type: "Training",
  },
  {
    id: 5,
    title: "Employee Engagement & Retention Strategies",
    date: "May 10, 2025",
    time: "1:00 PM - 5:00 PM",
    venue: "CIPM Office, Wuse Zone 4",
    description: "Best practices for creating engaging workplace cultures and retaining top talent in competitive markets.",
    capacity: "60 participants",
    status: "Open for Registration",
    type: "Workshop",
  },
  {
    id: 6,
    title: "Monthly HR Forum",
    date: "Every Last Friday",
    time: "4:00 PM - 6:00 PM",
    venue: "CIPM Office, Wuse Zone 4",
    description: "Regular meetup for members to discuss current HR challenges, share experiences, and network.",
    capacity: "40 participants",
    status: "Ongoing",
    type: "Forum",
  },
];

const pastEvents = [
  {
    title: "Annual General Meeting 2024",
    date: "December 2024",
    attendees: "350+",
  },
  {
    title: "HR Excellence Awards",
    date: "November 2024",
    attendees: "200+",
  },
  {
    title: "Performance Management Workshop",
    date: "October 2024",
    attendees: "80+",
  },
];

export default function Events() {
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
              {events.map((event) => (
                <Card key={event.id} className="shadow-medium hover:shadow-strong transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {event.type}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        event.status === "Limited Spaces" 
                          ? "bg-destructive/10 text-destructive" 
                          : "bg-secondary/20 text-secondary-foreground"
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{event.capacity}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-foreground mb-4">{event.description}</p>
                    
                    <Button variant="default" className="w-full">
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Recent Events</h2>
              <p className="text-lg text-muted-foreground">
                Highlights from our successful programs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {pastEvents.map((event, index) => (
                <Card key={index} className="shadow-soft">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                    <p className="text-2xl font-bold text-primary">{event.attendees}</p>
                    <p className="text-sm text-muted-foreground">Attendees</p>
                  </CardContent>
                </Card>
              ))}
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