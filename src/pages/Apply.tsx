import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function Apply() {
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-hero py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Membership Application
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Join the leading HR community in the Federal Capital Territory
            </p>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-strong mb-8">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Application Requirements</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Valid identification (National ID, Int'l Passport, or Driver's License)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Educational certificates</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Passport photograph</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Professional references (2)</span>
                      </div>
                    </div>
                  </div>

                  <form className="space-y-6">
                    <div className="border-b border-border pb-6">
                      <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name *</label>
                          <Input placeholder="John" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name *</label>
                          <Input placeholder="Doe" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Other Names</label>
                          <Input placeholder="Middle name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Date of Birth *</label>
                          <Input type="date" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Gender *</label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Marital Status *</label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="single">Single</SelectItem>
                              <SelectItem value="married">Married</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-border pb-6">
                      <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Email Address *</label>
                          <Input type="email" placeholder="john.doe@example.com" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number *</label>
                          <Input type="tel" placeholder="+234 XXX XXX XXXX" required />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">Residential Address *</label>
                          <Textarea placeholder="Enter your full address" rows={3} required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">City *</label>
                          <Input placeholder="Abuja" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">State *</label>
                          <Input placeholder="FCT" required />
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-border pb-6">
                      <h3 className="text-xl font-bold mb-4">Educational Background</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Highest Qualification *</label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select qualification" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ond">OND</SelectItem>
                              <SelectItem value="hnd">HND</SelectItem>
                              <SelectItem value="bsc">BSc/BA</SelectItem>
                              <SelectItem value="msc">MSc/MA</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Institution *</label>
                          <Input placeholder="University/Institution name" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Course of Study *</label>
                          <Input placeholder="e.g., Human Resource Management" required />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Year of Graduation *</label>
                            <Input type="number" placeholder="2020" required />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Class of Degree</label>
                            <Input placeholder="e.g., Second Class Upper" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-border pb-6">
                      <h3 className="text-xl font-bold mb-4">Professional Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Current Employment Status *</label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="employed">Employed</SelectItem>
                              <SelectItem value="self-employed">Self-Employed</SelectItem>
                              <SelectItem value="unemployed">Unemployed</SelectItem>
                              <SelectItem value="student">Student</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Current Organization</label>
                          <Input placeholder="Organization name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Job Title</label>
                          <Input placeholder="e.g., HR Manager" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Years of HR Experience *</label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-1">Less than 1 year</SelectItem>
                              <SelectItem value="1-3">1-3 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="5-10">5-10 years</SelectItem>
                              <SelectItem value="10+">More than 10 years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-border pb-6">
                      <h3 className="text-xl font-bold mb-4">Membership Category</h3>
                      <div>
                        <label className="block text-sm font-medium mb-2">Select Membership Category *</label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student Member</SelectItem>
                            <SelectItem value="associate">Associate Member</SelectItem>
                            <SelectItem value="full">Full Member</SelectItem>
                            <SelectItem value="fellow">Fellow</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-2">
                          Choose based on your qualifications and experience. Unsure? Contact us for guidance.
                        </p>
                      </div>
                    </div>

                    <div className="border-b border-border pb-6">
                      <h3 className="text-xl font-bold mb-4">Document Upload</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Passport Photograph *</label>
                          <Input type="file" accept="image/*" required />
                        </div>
                        <div>
                          
                          
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Valid ID Card *</label>
                          <Input type="file" accept=".pdf,.jpg,.jpeg,.png" required />
                        </div>
                        
                      </div>
                    </div>

                    <div className="pb-6">
                      <h3 className="text-xl font-bold mb-4">Declaration</h3>
                      <label className="flex items-start gap-3">
                        <input type="checkbox" required className="mt-1" />
                        <span className="text-sm text-muted-foreground">
                          I hereby declare that the information provided above is true and correct to the best of my knowledge. 
                          I understand that providing false information may result in the rejection of my application or 
                          termination of membership.
                        </span>
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button type="submit" variant="default" size="lg" className="flex-1">
                        Submit Application
                      </Button>
                      <Button type="button" variant="outline" size="lg" className="flex-1">
                        Save as Draft
                      </Button>
                    </div>

                    <p className="text-xs text-center text-muted-foreground">
                      After submission, your application will be reviewed within 5-7 business days. 
                      You will receive an email notification about the status of your application.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
}