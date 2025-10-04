import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Get in touch with CIPM Abuja Branch - We're here to help
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Have questions about membership, events, or our services? We'd love to hear from you.
                </p>

                <div className="space-y-6">
                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Our Office</h3>
                          <p className="text-muted-foreground">
                            CIPM North Central Zone Office<br />
                            Plot 17 Benghazi Street<br />
                            Wuse Zone 4, Abuja<br />
                            Nigeria
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Phone</h3>
                          <p className="text-muted-foreground">08056357501</p>
                          <p className="text-sm text-muted-foreground mt-1">Monday - Friday, 9AM - 5PM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Email</h3>
                          <p className="text-muted-foreground">abuja@cipmnigeria.org</p>
                          <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Office Hours</h3>
                          <p className="text-muted-foreground">
                            Monday - Friday: 9:00 AM - 5:00 PM<br />
                            Saturday - Sunday: Closed
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Social Media */}
                <div className="mt-8">
                  <h3 className="font-semibold mb-4">Connect With Us</h3>
                  <div className="flex gap-3">
                    <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="shadow-medium">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                    <form className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                            First Name *
                          </label>
                          <Input id="firstName" placeholder="John" required />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                            Last Name *
                          </label>
                          <Input id="lastName" placeholder="Doe" required />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <Input id="email" type="email" placeholder="john.doe@example.com" required />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <Input id="phone" type="tel" placeholder="+234 XXX XXX XXXX" />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject *
                        </label>
                        <Input id="subject" placeholder="How can we help you?" required />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <Textarea 
                          id="message" 
                          placeholder="Tell us more about your inquiry..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button type="submit" variant="default" size="lg" className="w-full">
                        Send Message
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        * Required fields. We respect your privacy and will never share your information.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Find Us</h2>
              <Card className="shadow-medium overflow-hidden">
                <div className="h-96 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-lg font-semibold">Interactive Map</p>
                    <p className="text-sm text-muted-foreground">
                      Plot 17 Benghazi Street, Wuse Zone 4, Abuja
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Have More Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Check out our frequently asked questions or reach out directly
            </p>
            <Button variant="outline" size="lg">
              View FAQs
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}