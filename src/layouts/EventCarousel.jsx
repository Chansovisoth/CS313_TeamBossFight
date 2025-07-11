// ===== LIBRARIES ===== //
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EventCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [events.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? events.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === events.length - 1 ? 0 : currentIndex + 1);
  };

  const currentEvent = events[currentIndex];

  return (
    <div className="relative w-full">
      {/* Main Event Card */}
      <div className="relative bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mx-2 sm:mx-4 md:mx-8 lg:mx-auto max-w-4xl overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 p-1 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 text-white hidden sm:flex items-center justify-center"
          aria-label="Previous event"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 p-1 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 text-white hidden sm:flex items-center justify-center"
          aria-label="Next event"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Event Content */}
        <div className="text-center px-4 sm:px-8 md:px-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 text-white leading-tight">
            {currentEvent.name}
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-medium mb-3 sm:mb-4">
            {currentEvent.title}
          </p>
          
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 mb-4 sm:mb-6 leading-relaxed max-w-3xl mx-auto">
            {currentEvent.description}
          </p>
          
          {/* Event Times */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center text-white/90 text-xs sm:text-sm md:text-base mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Start:</span>
              <span>{currentEvent.startTime}</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/40"></div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">End:</span>
              <span>{currentEvent.endTime}</span>
            </div>
          </div>
          
          {/* Event Status */}
          <div className="flex justify-center">
            {currentEvent.isActive ? (
              <div className="inline-block bg-green-500/20 text-green-300 px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium">
                🟢 Happening Now
              </div>
            ) : (
              <div className="inline-block bg-yellow-500/20 text-yellow-300 px-3 sm:px-4 md:px-6 py-2 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-medium">
                🟡 Coming Soon
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Arrows */}
      <div className="flex sm:hidden justify-between items-center mt-4 px-4">
        <button
          onClick={goToPrevious}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 text-white"
          aria-label="Previous event"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={goToNext}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 text-white"
          aria-label="Next event"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center space-x-2 mt-4 sm:mt-6">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white shadow-lg scale-125"
                : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to event ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;
