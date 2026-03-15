import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

// Fallback static images
import event1 from "@/assets/gallery/event-1.jpg";
import event2 from "@/assets/gallery/event-2.jpg";
import event3 from "@/assets/gallery/event-3.jpg";
import event4 from "@/assets/gallery/event-4.jpg";
import event5 from "@/assets/gallery/event-5.jpg";
import event6 from "@/assets/gallery/event-6.jpg";
import event7 from "@/assets/gallery/event-7.jpg";

const fallbackImages = [event1, event2, event3, event4, event5, event6, event7];

export default function Gallery() {
  const navigate = useNavigate();
  const [images, setImages] = useState<{ url: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false });
      if (data && data.length > 0) {
        setImages(data.map((img: any) => ({ url: img.image_url, title: img.title || "" })));
      } else {
        setImages(fallbackImages.map((url, i) => ({ url, title: `Event ${i + 1}` })));
      }
      setLoading(false);
    };
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Gallery</h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              A visual journey through our events, programs, and memorable moments
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Event Photos</h2>
              <p className="text-lg text-muted-foreground">Browse through our collection of memorable moments</p>
            </div>

            {loading ? (
              <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : (
              <div className="max-w-5xl mx-auto">
                <Carousel className="w-full">
                  <CarouselContent>
                    {images.map((image, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="relative overflow-hidden rounded-lg shadow-medium aspect-[4/3]">
                          <img src={image.url} alt={image.title} className="w-full h-full object-cover" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            )}
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Want to be Part of Our Story?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join CIPM Abuja Branch and be featured in our future events and celebrations
            </p>
            <Button variant="default" size="lg" onClick={() => navigate("/membership")}>Become a Member</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
