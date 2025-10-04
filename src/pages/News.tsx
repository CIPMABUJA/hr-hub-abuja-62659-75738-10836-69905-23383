import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const newsArticles = [
  {
    id: 1,
    title: "CIPM Abuja Branch Announces 2025 HR Summit",
    date: "January 15, 2025",
    category: "Events",
    excerpt: "We are excited to announce the annual HR Summit 2025, bringing together top HR practitioners, thought leaders, and business executives from across Nigeria.",
    author: "Branch Secretariat",
    featured: true,
  },
  {
    id: 2,
    title: "New Leadership Development Program Launched",
    date: "January 10, 2025",
    category: "Programs",
    excerpt: "The branch has launched a comprehensive leadership development program aimed at building strategic capabilities for HR professionals in leadership positions.",
    author: "Training Committee",
    featured: false,
  },
  {
    id: 3,
    title: "CIPM Partners with Federal Ministries for HR Capacity Building",
    date: "December 20, 2024",
    category: "Partnerships",
    excerpt: "Strategic partnership announced to enhance HR capacity across federal government agencies in the FCT.",
    author: "Branch Chairman",
    featured: false,
  },
  {
    id: 4,
    title: "December CPD Workshop Success Story",
    date: "December 15, 2024",
    category: "Events",
    excerpt: "Over 120 members participated in our December CPD workshop on Performance Management Systems, earning valuable professional development points.",
    author: "Events Team",
    featured: false,
  },
  {
    id: 5,
    title: "Celebrating Excellence: 2024 HR Awards Winners",
    date: "November 30, 2024",
    category: "Awards",
    excerpt: "Recognition of outstanding HR practitioners and organizations that demonstrated excellence in people management throughout 2024.",
    author: "Awards Committee",
    featured: false,
  },
  {
    id: 6,
    title: "New Membership Portal Goes Live",
    date: "November 15, 2024",
    category: "Announcements",
    excerpt: "Members can now access an improved online portal for registration, renewals, event bookings, and CPD tracking.",
    author: "IT Committee",
    featured: false,
  },
  {
    id: 7,
    title: "Youth Employment Initiative Launched",
    date: "October 28, 2024",
    category: "Initiatives",
    excerpt: "CIPM Abuja launches initiative to support youth employment through skills development and job placement programs.",
    author: "Social Impact Team",
    featured: false,
  },
  {
    id: 8,
    title: "October Monthly Forum Highlights",
    date: "October 25, 2024",
    category: "Events",
    excerpt: "Key insights from our monthly HR forum discussing the future of work and hybrid workplace strategies.",
    author: "Forum Coordinator",
    featured: false,
  },
];

const categories = ["All", "Events", "Programs", "Partnerships", "Awards", "Announcements", "Initiatives"];

export default function News() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              News & Updates
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Stay informed about the latest happenings, programs, and achievements at CIPM Abuja Branch
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {newsArticles.filter(article => article.featured).map((article) => (
          <section key={article.id} className="py-12">
            <div className="container mx-auto px-4">
              <Card className="max-w-5xl mx-auto shadow-strong">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-semibold px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                      Featured
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    <span>•</span>
                    <span>By {article.author}</span>
                  </div>
                  <p className="text-lg text-foreground mb-6">{article.excerpt}</p>
                  <Button variant="default">
                    Read Full Article <ArrowRight className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        ))}

        {/* News Grid */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Latest News</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {newsArticles.filter(article => !article.featured).map((article) => (
                <Card key={article.id} className="shadow-medium hover:shadow-strong transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="h-4 w-4 text-primary" />
                      <span className="text-xs font-semibold text-primary">
                        {article.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h3>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                    
                    <p className="text-sm text-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      Read More <ArrowRight className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto shadow-strong bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Never Miss an Update
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Subscribe to our newsletter for the latest news, events, and HR insights
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-md text-foreground"
                  />
                  <Button variant="hero">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Archives */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Looking for Older Articles?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse our complete archive of news and updates
            </p>
            <Button variant="outline" size="lg">
              View Archive
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}