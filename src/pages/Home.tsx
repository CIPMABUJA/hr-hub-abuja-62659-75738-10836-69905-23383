import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Users, Award, BookOpen, ArrowRight, CheckCircle2, GraduationCap, Briefcase, Megaphone, Handshake } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-home-new.jpg";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import gallery1 from "@/assets/gallery/event-1.jpg";
import gallery2 from "@/assets/gallery/event-2.jpg";
import gallery3 from "@/assets/gallery/event-3.jpg";
import gallery4 from "@/assets/gallery/event-4.jpg";
import gallery5 from "@/assets/gallery/event-5.jpg";
import gallery6 from "@/assets/gallery/event-6.jpg";
import gallery7 from "@/assets/gallery/event-7.jpg";
import chairmanPhoto from "@/assets/chairman.png";
import viceChairmanPhoto from "@/assets/vice-chairman.png";
import assistantSecretaryPhoto from "@/assets/assistant-secretary.png";
import financialSecretaryPhoto from "@/assets/financial-secretary.png";
import branchTreasurerPhoto from "@/assets/branch-treasurer.png";
import branchSecretaryPhoto from "@/assets/branch-secretary.png";
const upcomingEvents = [{
  title: "HR Summit 2025",
  date: "March 15, 2025",
  location: "Transcorp Hilton, Abuja",
  description: "Annual gathering of HR professionals across the FCT"
}, {
  title: "Leadership Masterclass",
  date: "March 28, 2025",
  location: "CIPM Office, Wuse Zone 4",
  description: "Developing strategic leadership skills for HR practitioners"
}, {
  title: "CPD Workshop Series",
  date: "April 5, 2025",
  location: "Online via Zoom",
  description: "Continuous professional development for members"
}];
const testimonials = [{
  name: "Dr. Amina Bello",
  role: "HR Director, Federal Ministry",
  content: "CIPM Abuja has been instrumental in my professional growth. The networking opportunities and training programs are exceptional."
}, {
  name: "Chukwuma Okafor",
  role: "Head of HR, Tech Startup",
  content: "Being a member has opened doors to incredible resources and a community of passionate HR professionals."
}];
const stats = [{
  icon: Users,
  label: "Active Members",
  value: "500+"
}, {
  icon: Calendar,
  label: "Annual Events",
  value: "24+"
}, {
  icon: Award,
  label: "Certifications",
  value: "150+"
}, {
  icon: BookOpen,
  label: "Training Hours",
  value: "1000+"
}];
const teamMembers = [{
  name: "Daniel Afolabi MCIPM",
  role: "Chairman",
  initials: "DA",
  image: chairmanPhoto
}, {
  name: "Aina Segun Aina, ACIPM",
  role: "Vice Chairman",
  initials: "AS",
  image: viceChairmanPhoto
}, {
  name: "Mohammed Umar Ali, ACIPM",
  role: "Assistant Secretary/PRO",
  initials: "MA",
  image: assistantSecretaryPhoto
}, {
  name: "Mr. Tochukwu Umeh",
  role: "Financial Secretary",
  initials: "TU",
  image: financialSecretaryPhoto
}, {
  name: "Mr. Ayo Fatunwase, ACIPM",
  role: "Branch Treasurer",
  initials: "AF",
  image: branchTreasurerPhoto
}, {
  name: "Mrs Rachael Adegbe, MCIPM",
  role: "Branch Secretary",
  initials: "RA",
  image: branchSecretaryPhoto
}];
const galleryImages = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7
];
export default function Home() {
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="CIPM Abuja Branch" className="w-full h-full object-cover" />
            <div className="absolute inset-0 gradient-overlay" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Empowering HR Excellence in the Federal Capital
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
              Building People. Building Organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/membership">Join Now <ArrowRight className="ml-2" /></Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => <div key={index} className="text-center">
                  <stat.icon className="h-12 w-12 mx-auto text-primary mb-3" />
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>)}
            </div>
          </div>
        </section>

        {/* About Us Preview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                CIPM Abuja Branch is a key regional chapter of Nigeria's foremost HR regulatory body. Based in the Federal Capital Territory, we serve as a hub for HR professionals across public and private sectors, providing knowledge, certification, and advocacy to shape a more effective workforce.
              </p>
              <Button variant="outline" asChild>
                <Link to="/about">
                  Read More About Us <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
                What We Offer
              </h2>
              <p className="text-xl text-center text-muted-foreground mb-12">Our Value to You</p>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="shadow-medium hover:shadow-strong transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <BookOpen className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">Professional Certification & Training</h3>
                        <p className="text-muted-foreground">Prepare for CIPM exams and stay ahead in your HR career.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-medium hover:shadow-strong transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <GraduationCap className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">Workshops & CPD Programs</h3>
                        <p className="text-muted-foreground">Learn from industry experts and expand your skillset.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-medium hover:shadow-strong transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Briefcase className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">Consulting & Advisory</h3>
                        <p className="text-muted-foreground">Tailored HR solutions for organizations.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-medium hover:shadow-strong transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Megaphone className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">Policy Advocacy</h3>
                        <p className="text-muted-foreground">Representing the HR profession in national discussions.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-medium hover:shadow-strong transition-shadow duration-300 md:col-span-2">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Handshake className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold mb-2">Networking & Mentorship</h3>
                        <p className="text-muted-foreground">Connect with peers, mentors, and future collaborators.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center">
                <Button variant="default" asChild>
                  <Link to="/services">
                    Explore All Services <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        

        {/* Why Join Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
                Why Join CIPM Abuja?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {["Access to professional development programs", "Networking with HR leaders in the FCT", "Continuous learning opportunities", "Industry recognition and credibility", "Mentorship from experienced practitioners", "Advocacy and policy engagement"].map((benefit, index) => <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                    <span className="text-foreground">{benefit}</span>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Leadership Team</h2>
              <p className="text-lg text-muted-foreground">Dedicated professionals driving HR excellence in the FCT</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => <Card key={index} className="text-center shadow-medium hover:shadow-strong transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Avatar className="h-56 w-56 mx-auto mb-4">
                      {member.image && <AvatarImage src={member.image} alt={member.name} />}
                      <AvatarFallback className="text-3xl bg-primary text-primary-foreground">{member.initials}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>


        {/* Gallery Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Event Highlights</h2>
              <p className="text-lg text-muted-foreground">Moments from our recent events and activities</p>
            </div>
            <div className="max-w-5xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="relative overflow-hidden rounded-lg shadow-medium aspect-[4/3]">
                        <img src={image} alt={`Event ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link to="/gallery">
                  View Full Gallery <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Join the Leading HR Community in Nigeria?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Take the next step in your professional journey
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/membership">
                Become a Member <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
}