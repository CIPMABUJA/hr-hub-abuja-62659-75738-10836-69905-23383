import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Loader2 } from "lucide-react";
import { format } from "date-fns";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NewsArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('news')
      .select('*, profiles(*)')
      .eq('id', id)
      .eq('published', true)
      .single();

    if (!error && data) {
      setArticle(data);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16">
          <div className="container mx-auto px-4">
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground mb-4">Article not found</p>
                <Button onClick={() => navigate('/news')}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to News
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        {article.image_url && (
          <section className="relative h-96 overflow-hidden">
            <img 
              src={article.image_url} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </section>
        )}

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/news')}
              className="mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>

            <article className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  {article.published_at && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(article.published_at), 'MMMM dd, yyyy')}</span>
                    </div>
                  )}
                  {article.profiles && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>By {article.profiles.first_name} {article.profiles.last_name}</span>
                    </div>
                  )}
                </div>
              </div>

              {article.excerpt && (
                <p className="text-xl text-muted-foreground italic border-l-4 border-primary pl-4">
                  {article.excerpt}
                </p>
              )}

              <div className="prose prose-lg max-w-none">
                <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {article.content}
                </p>
              </div>
            </article>

            {/* Related Articles */}
            <div className="mt-12 pt-12 border-t">
              <h2 className="text-2xl font-bold mb-6">More News</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Placeholder for related articles */}
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground py-8">
                      Check out more articles
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('/news')}
                    >
                      View All News
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}