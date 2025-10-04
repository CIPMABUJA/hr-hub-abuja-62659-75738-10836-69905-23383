import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Award, Users, Briefcase, MessageSquare, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  {
    icon: BookOpen,
    title: "Professional Development",
    description: "Comprehensive workshops, seminars, webinars, and HR forums designed to enhance your skills and knowledge in modern people management practices.",
    features: [
      "Monthly HR Masterclasses",
      "Quarterly Leadership Workshops",
      "Industry-Specific Training Programs",
      "Mentorship and Coaching Sessions",
    ],
  },
  {
    icon: Award,
    title: "Training and Certification",
    description: "Structured tutorials and preparation programs for CIPM professional qualifications and corporate training solutions.",
    features: [
      "Foundation Level Tutorials",
      "Intermediate Level Preparation",
      "Professional Level Training",
      "Custom Corporate Programs",
    ],
  },
  {
    icon: Briefcase,
    title: "Consulting and Advisory",
    description: "Expert consulting services to help organizations optimize their people management strategies and practices.",
    features: [
      "HR Policy Development",
      "Organizational Restructuring",
      "Performance Management Systems",
      "Compensation & Benefits Design",
    ],
  },
  {
    icon: MessageSquare,
    title: "Advocacy and Policy Engagement",
    description: "Active representation in national HR dialogues and contribution to employment policy development.",
    features: [
      "Policy Research & Analysis",
      "Stakeholder Engagement",
      "Labour Law Advocacy",
      "Industry Standards Development",
    ],
  },
  {
    icon: Users,
    title: "Member Support and Engagement",
    description: "Comprehensive support programs designed to enhance member experience and professional growth.",
    features: [
      "Welfare Programs",
      "Networking Events",
      "Career Development Support",
      "Social Impact Initiatives",
    ],
  },
  {
    icon: UserCheck,
    title: "CPD Programs",
    description: "Continuous Professional Development programs to keep members updated with the latest HR trends and best practices.",
    features: [
      "Annual CPD Point Requirements",
      "Certified Training Programs",
      "Industry Conferences",
      "Online Learning Resources",
    ],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Our Services
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Comprehensive programs and services designed to empower HR professionals 
              and strengthen organizational people management capabilities
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <Card key={index} className="shadow-medium hover:shadow-strong transition-all duration-300">
                  <CardContent className="p-6">
                    <service.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-secondary mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
                How We Serve You
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-2">Assess Your Needs</h3>
                  <p className="text-muted-foreground">
                    We understand your professional development goals and organizational requirements
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-2">Customize Solutions</h3>
                  <p className="text-muted-foreground">
                    We tailor our programs and services to meet your specific needs and objectives
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-2">Deliver Excellence</h3>
                  <p className="text-muted-foreground">
                    We execute with quality and provide ongoing support for maximum impact
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Training CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto shadow-strong bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Looking for Corporate Training Solutions?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  We offer customized training programs designed specifically for your organization's needs
                </p>
                <Button variant="hero" size="lg" asChild>
                  <Link to="/contact">Request a Consultation</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join us today and access world-class HR development programs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" asChild>
                <Link to="/membership">Become a Member</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/events">View Upcoming Events</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}