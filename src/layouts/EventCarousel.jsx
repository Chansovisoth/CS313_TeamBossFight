// ===== LIBRARIES ===== //
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";

// ===== COMPONENTS ===== //
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const EventCarousel = () => {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);

  // Event data - add more events here
  const events = [
    {
      id: 1,
      name: "Open House 2025",
      title: "Interactive Boss Battle Experience",
      description: "Join forces with other participants and put your knowledge to the test! Answer questions, deal damage, and work together to defeat powerful bosses.",
      startTime: "Today - 9:00 AM",
      endTime: "Today - 5:00 PM",
      gradient: "from-blue-600 via-purple-600 to-pink-600",
      isActive: true
    },
    {
      id: 2,
      name: "Tech Conference 2025",
      title: "Interactive Boss Battle Experience",
      description: "Compete in tech-based challenges and showcase your programming skills in our interactive battle arena. Network with industry professionals while battling epic bosses!",
      startTime: "April 20, 2025 - 10:00 AM",
      endTime: "April 20, 2025 - 6:00 PM",
      gradient: "from-green-600 via-teal-600 to-blue-600",
      isActive: false
    },
    {
      id: 3,
      name: "Science Fair 2025",
      title: "Interactive Boss Battle Experience",
      description: "Test your scientific knowledge in our epic quest format. Explore different fields of science while battling through challenging questions and powerful bosses.",
      startTime: "May 10, 2025 - 8:00 AM",
      endTime: "May 10, 2025 - 4:00 PM",
      gradient: "from-orange-600 via-red-600 to-pink-600",
      isActive: false
    }
  ];

  // Set up carousel API
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api?.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="relative w-full h-full">
      {/* Event Content - Shadcn Carousel */}
      <div className="event-banner-container mb-8">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {events.map((event) => (
              <CarouselItem key={event.id}>
                <div className="px-4">
                  <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 text-white">
                      {event.name}
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 font-medium mb-4">
                      {event.title}
                    </p>
                    <p className="text-sm md:text-base lg:text-lg text-white/80 mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    
                    {/* Event Times */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center text-white/90 text-xs md:text-sm lg:text-base mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Start:</span>
                        <span>{event.startTime}</span>
                      </div>
                      <div className="hidden sm:block w-px h-4 bg-white/40"></div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">End:</span>
                        <span>{event.endTime}</span>
                      </div>
                    </div>
                    
                    {/* Event Status Pills */}
                    <div className="flex justify-center mb-4">
                      {event.isActive ? (
                        <div className="inline-block bg-green-500/20 text-green-300 px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium">
                          Happening Now
                        </div>
                      ) : (
                        <div className="inline-block bg-yellow-500/20 text-yellow-300 px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium">
                          Coming Soon
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Arrows - Hidden on mobile */}
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-white shadow-lg"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;
