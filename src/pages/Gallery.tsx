import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import event1 from "@/assets/gallery/event-1.jpg";
import event2 from "@/assets/gallery/event-2.jpg";
import event3 from "@/assets/gallery/event-3.jpg";
import event4 from "@/assets/gallery/event-4.jpg";
import event5 from "@/assets/gallery/event-5.jpg";
import event6 from "@/assets/gallery/event-6.jpg";
import event7 from "@/assets/gallery/event-7.jpg";

const galleryImages = [
  event1,
  event2,
  event3,
  event4,
  event5,
  event6,
  event7
];


export default function Gallery() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Gallery
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              A visual journey through our events, programs, and memorable moments
            </p>
          </div>
        </section>


        {/* Photo Gallery Carousel */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Event Photos</h2>
              <p className="text-lg text-muted-foreground">
                Browse through our collection of memorable moments
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="relative overflow-hidden rounded-lg shadow-medium aspect-[4/3]">
                        <img src={image} alt={`Event ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Want to be Part of Our Story?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join CIPM Abuja Branch and be featured in our future events and celebrations
            </p>
            <Button variant="default" size="lg">
              Become a Member
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}