import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

export default function News() {
  const navigate = useNavigate();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error) {
      toast.error("Failed to load news");
      return;
    }

    setNews(data || []);
    setLoading(false);
  };

  const featuredArticle = news[0];
  const latestNews = news.slice(1);
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


        {/* Featured Article */}
        {loading ? (
          <section className="py-12">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
              Loading news...
            </div>
          </section>
        ) : featuredArticle && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Card 
                className="max-w-5xl mx-auto shadow-strong overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => navigate(`/news/${featuredArticle.id}`)}
              >
                {featuredArticle.image_url && (
                  <div className="h-80 overflow-hidden">
                    <img 
                      src={featuredArticle.image_url} 
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-semibold px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                      Featured
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:text-primary transition-colors">{featuredArticle.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(featuredArticle.published_at), 'MMMM dd, yyyy')}</span>
                    </div>
                  </div>
                  <p className="text-lg text-foreground mb-6">{featuredArticle.excerpt}</p>
                  <Button variant="default">
                    Read Full Article <ArrowRight className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* News Grid */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Latest News</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {loading ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  Loading articles...
                </div>
              ) : latestNews.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No news articles available yet.
                </div>
              ) : (
                latestNews.map((article) => (
                  <Card 
                    key={article.id} 
                    className="shadow-medium hover:shadow-strong transition-all duration-300 cursor-pointer overflow-hidden"
                    onClick={() => navigate(`/news/${article.id}`)}
                  >
                    {article.image_url && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={article.image_url} 
                          alt={article.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">{article.title}</h3>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4" />
                        <span>{format(new Date(article.published_at), 'MMM dd, yyyy')}</span>
                      </div>
                      
                      <p className="text-sm text-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                      
                      <Button variant="outline" size="sm" className="w-full">
                        Read More <ArrowRight className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
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