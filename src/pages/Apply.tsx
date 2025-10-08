import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Apply() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    education: "",
    institution: "",
    graduation_year: "",
    current_employer: "",
    job_title: "",
    years_experience: "",
    membership_category: "",
    document_url: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase.from("applications").insert([
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          education: formData.education,
          institution: formData.institution,
          graduation_year: parseInt(formData.graduation_year) || null,
          current_employer: formData.current_employer,
          job_title: formData.job_title,
          years_experience: parseInt(formData.years_experience) || 0,
          membership_category: formData.membership_category as "student" | "associate" | "graduate" | "member" | "fellow",
          document_url: formData.document_url,
          user_id: user?.id || null,
          status: "pending",
        },
      ]);

      if (error) throw error;

      toast.success("Application submitted successfully! We'll review it within 5-7 business days.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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
                        <span className="text-sm">Valid identification</span>
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

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-border pb-6">
                      <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name *</label>
                          <Input
                            value={formData.first_name}
                            onChange={(e) => handleChange("first_name", e.target.value)}
                            placeholder="John"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name *</label>
                          <Input
                            value={formData.last_name}
                            onChange={(e) => handleChange("last_name", e.target.value)}
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-border pb-6">
                      <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Email Address *</label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="john.doe@example.com"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number *</label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            placeholder="+234 XXX XXX XXXX"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">Residential Address *</label>
                          <Textarea
                            value={formData.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            placeholder="Enter your full address"
                            rows={3}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">City *</label>
                          <Input
                            value={formData.city}
                            onChange={(e) => handleChange("city", e.target.value)}
                            placeholder="Abuja"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">State *</label>
                          <Input
                            value={formData.state}
                            onChange={(e) => handleChange("state", e.target.value)}
                            placeholder="FCT"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-border pb-6">
                      <h3 className="text-xl font-bold mb-4">Educational Background</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Highest Qualification *</label>
                          <Select
                            value={formData.education}
                            onValueChange={(value) => handleChange("education", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select qualification" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ond">OND</SelectItem>
                              <SelectItem value="hnd">HND</SelectItem>
                              <SelectItem value="bsc">BSc/BA</SelectItem>
                              <SelectItem value="msc">MSc/MA</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Institution *</label>
                          <Input
                            value={formData.institution}
                            onChange={(e) => handleChange("institution", e.target.value)}
                            placeholder="University/Institution name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Year of Graduation *</label>
                          <Input
                            type="number"
                            value={formData.graduation_year}
                            onChange={(e) => handleChange("graduation_year", e.target.value)}
                            placeholder="2020"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-border pb-6">
                      <h3 className="text-xl font-bold mb-4">Professional Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Current Organization</label>
                          <Input
                            value={formData.current_employer}
                            onChange={(e) => handleChange("current_employer", e.target.value)}
                            placeholder="Organization name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Job Title</label>
                          <Input
                            value={formData.job_title}
                            onChange={(e) => handleChange("job_title", e.target.value)}
                            placeholder="e.g., HR Manager"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Years of HR Experience *</label>
                          <Input
                            type="number"
                            value={formData.years_experience}
                            onChange={(e) => handleChange("years_experience", e.target.value)}
                            placeholder="0"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-border pb-6">
                      <h3 className="text-xl font-bold mb-4">Membership Category</h3>
                      <div>
                        <label className="block text-sm font-medium mb-2">Select Membership Category *</label>
                        <Select
                          value={formData.membership_category}
                          onValueChange={(value) => handleChange("membership_category", value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Student Member</SelectItem>
                            <SelectItem value="associate">Associate Member</SelectItem>
                            <SelectItem value="graduate">Graduate Member</SelectItem>
                            <SelectItem value="full">Full Member</SelectItem>
                            <SelectItem value="fellow">Fellow</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="pb-6">
                      <h3 className="text-xl font-bold mb-4">Declaration</h3>
                      <label className="flex items-start gap-3">
                        <input type="checkbox" required className="mt-1" />
                        <span className="text-sm text-muted-foreground">
                          I hereby declare that the information provided above is true and correct to the best of my knowledge.
                        </span>
                      </label>
                    </div>

                    <Button type="submit" variant="default" size="lg" className="w-full" disabled={loading}>
                      {loading ? "Submitting..." : "Submit Application"}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      After submission, your application will be reviewed within 5-7 business days.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
