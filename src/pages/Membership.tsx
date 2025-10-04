import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const membershipCategories = [
  {
    category: "Student Member",
    description: "For individuals currently enrolled in HR or related degree programs",
    requirements: [
      "Enrolled in a recognized tertiary institution",
      "Studying HR, Business Administration, or related fields",
      "Valid student ID",
    ],
    benefits: [
      "Access to student events and workshops",
      "Reduced training fees",
      "Career guidance and mentorship",
      "Access to learning resources",
    ],
  },
  {
    category: "Associate Member",
    description: "For early-career HR professionals and recent graduates",
    requirements: [
      "Relevant degree or diploma in HR/Management",
      "0-3 years of HR experience",
      "Completion of CIPM Foundation examination",
    ],
    benefits: [
      "Access to all member events",
      "Networking opportunities",
      "Professional development programs",
      "Career advancement support",
      "Use of ACIPM designation",
    ],
  },
  {
    category: "Full Member",
    description: "For established HR professionals with significant experience",
    requirements: [
      "Relevant degree qualification",
      "Minimum 5 years HR experience",
      "Completion of CIPM Professional examinations",
      "Professional references",
    ],
    benefits: [
      "Full voting rights",
      "Priority event registration",
      "Consulting opportunities",
      "Leadership development programs",
      "Use of MCIPM designation",
    ],
  },
  {
    category: "Fellow",
    description: "The highest membership grade for distinguished HR practitioners",
    requirements: [
      "Full member for minimum 5 years",
      "Minimum 10 years senior HR experience",
      "Significant contribution to the profession",
      "Recommendation by existing Fellows",
    ],
    benefits: [
      "Highest professional recognition",
      "Speaking and thought leadership opportunities",
      "Mentorship roles",
      "Policy advisory positions",
      "Use of FCIPM designation",
    ],
  },
];

const generalBenefits = [
  "Professional Recognition and Credibility",
  "Access to Exclusive Training Programs",
  "Networking with Industry Leaders",
  "Career Development Resources",
  "CPD Point Tracking and Certification",
  "Job Placement Assistance",
  "Access to HR Research and Publications",
  "Discounted Conference Rates",
  "Professional Indemnity Insurance (for eligible members)",
  "Voting Rights in Branch Elections",
];

export default function Membership() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Membership
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Join the leading community of HR professionals in the Federal Capital Territory
            </p>
          </div>
        </section>

        {/* Why Join */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Join CIPM Abuja?
              </h2>
              <p className="text-lg text-muted-foreground">
                Become part of a prestigious network of HR professionals committed to excellence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {generalBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Categories */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Membership Categories
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose the category that matches your professional journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {membershipCategories.map((category, index) => (
                <Card key={index} className="shadow-medium hover:shadow-strong transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{category.category}</h3>
                    <p className="text-muted-foreground mb-6">{category.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Requirements:</h4>
                      <ul className="space-y-2">
                        {category.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-primary mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Benefits:</h4>
                      <ul className="space-y-2">
                        {category.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
                How to Apply
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="font-bold mb-2">Choose Category</h3>
                  <p className="text-sm text-muted-foreground">
                    Select the membership category that matches your qualifications
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="font-bold mb-2">Complete Form</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out the online membership application form
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="font-bold mb-2">Submit Documents</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload required credentials and pay application fee
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    4
                  </div>
                  <h3 className="font-bold mb-2">Get Approved</h3>
                  <p className="text-sm text-muted-foreground">
                    Application review and membership activation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Renewal Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Existing Members
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Renew your membership to continue enjoying all member benefits and maintain your professional standing
              </p>
              <Button variant="outline" size="lg">
                Renew Membership
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Join?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your membership application today and take the next step in your HR career
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" asChild>
                <Link to="/apply">Apply Now <ArrowRight className="ml-2" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Have Questions?</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}