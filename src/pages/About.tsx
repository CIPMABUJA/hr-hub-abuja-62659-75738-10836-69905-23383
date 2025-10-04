import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, Users, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import aboutHero from "@/assets/about-hero-cipm.jpg";
import cipmTeam from "@/assets/cipm-team.jpg";

const values = [
  {
    icon: Award,
    title: "Professionalism",
    description: "Upholding the highest standards in HR practice and ethics",
  },
  {
    icon: Users,
    title: "Integrity",
    description: "Building trust through transparent and ethical conduct",
  },
  {
    icon: Target,
    title: "Continuous Learning",
    description: "Committed to ongoing professional development and growth",
  },
  {
    icon: LinkIcon,
    title: "Collaboration",
    description: "Fostering partnerships and knowledge sharing",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={aboutHero} alt="About CIPM Abuja" className="w-full h-full object-cover" />
            <div className="absolute inset-0 gradient-overlay" />
          </div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              About CIPM Abuja Branch
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Leading the way in HR excellence across the Federal Capital Territory
            </p>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Who We Are</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <img 
                    src={cipmTeam} 
                    alt="CIPM Nigeria HR Professionals" 
                    className="rounded-lg shadow-medium w-full h-auto object-cover"
                  />
                </div>
                <div className="space-y-4 text-lg text-muted-foreground order-1 md:order-2">
                  <p>
                    The Chartered Institute of Personnel Management of Nigeria (CIPM) is the apex regulatory 
                    body for the practice of Human Resource Management in Nigeria. The Abuja Branch serves as 
                    one of the Institute's most vibrant branches, strategically positioned in the Federal 
                    Capital Territory to connect HR professionals across government, corporate, and development sectors.
                  </p>
                  <p>
                    We are committed to promoting excellence, professionalism, and ethics in people management. 
                    Through our programs, events, and collaborations, we provide capacity development, knowledge 
                    exchange, and advocacy platforms that strengthen the HR profession in Nigeria.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card className="shadow-medium">
                <CardContent className="p-8">
                  <Eye className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be the foremost people management institute in Africa, respected globally for 
                    our standards of excellence and commitment to developing HR professionals who drive 
                    organizational success.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="shadow-medium">
                <CardContent className="p-8">
                  <Target className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To promote excellence in people management through value-driven learning and development, 
                    ethical practice, and continuous innovation in HR strategies that contribute to national 
                    and organizational development.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <value.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
                Our Impact
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground">Active Members</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">24+</div>
                  <div className="text-muted-foreground">Annual Events</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                  <div className="text-muted-foreground">Training Hours Delivered</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Join Our Community
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Be part of a network of dedicated HR professionals committed to excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" asChild>
                <Link to="/membership">Become a Member</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}