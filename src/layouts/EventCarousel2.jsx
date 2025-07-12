// ===== LIBRARIES ===== //
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EventCarousel2 = () => {
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
      image: "/src/assets/Swords.png",
      isActive: true
    },
    {
      id: 2,
      name: "Tech Conference 2025",
      title: "Interactive Boss Battle Experience",
      description: "Compete in tech-based challenges and showcase your programming skills in our interactive battle arena. Network with industry professionals while battling epic bosses!",
      startTime: "April 20, 2025 - 10:00 AM",
      endTime: "April 20, 2025 - 6:00 PM",
      image: "/src/assets/Swords.png",
      isActive: false
    },
    {
      id: 3,
      name: "Science Fair 2025",
      title: "Interactive Boss Battle Experience",
      description: "Test your scientific knowledge in our epic quest format. Explore different fields of science while battling through challenging questions and powerful bosses.",
      startTime: "May 10, 2025 - 8:00 AM",
      endTime: "May 10, 2025 - 4:00 PM",
      image: "/src/assets/Swords.png",
      isActive: false
    },
    {
      id: 3,
      name: "Science Fair 2025",
      title: "Interactive Boss Battle Experience",
      description: "Test your scientific knowledge in our epic quest format. Explore different fields of science while battling through challenging questions and powerful bosses.",
      startTime: "May 10, 2025 - 8:00 AM",
      endTime: "May 10, 2025 - 4:00 PM",
      image: "/src/assets/Swords.png",
      isActive: false
    },
    {
      id: 3,
      name: "Science Fair 2025",
      title: "Interactive Boss Battle Experience",
      description: "Test your scientific knowledge in our epic quest format. Explore different fields of science while battling through challenging questions and powerful bosses.",
      startTime: "May 10, 2025 - 8:00 AM",
      endTime: "May 10, 2025 - 4:00 PM",
      image: "/src/assets/Swords.png",
      isActive: false
    },
    {
      id: 3,
      name: "Science Fair 2025",
      title: "Interactive Boss Battle Experience",
      description: "Test your scientific knowledge in our epic quest format. Explore different fields of science while battling through challenging questions and powerful bosses.",
      startTime: "May 10, 2025 - 8:00 AM",
      endTime: "May 10, 2025 - 4:00 PM",
      image: "/src/assets/Swords.png",
      isActive: false
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000);

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

  const getCardPosition = (index) => {
    const diff = index - currentIndex;
    
    if (diff === 0) {
      // Center card
      return "translate-x-[-50%] translate-y-[-50%] z-10 scale-100 brightness-100";
    } else if (diff === -1 || (diff === events.length - 1)) {
      // Left card
      return "translate-x-[-80%] translate-y-[-50%] scale-75 brightness-[.4]";
    } else if (diff === 1 || (diff === -(events.length - 1))) {
      // Right card
      return "translate-x-[-20%] translate-y-[-50%] scale-75 brightness-[.4]";
    } else {
      // Hidden cards
      return "translate-x-[-20%] translate-y-[-50%] scale-75 brightness-[.4] opacity-0";
    }
  };

  const currentEvent = events[currentIndex];

  return (
    <div className="relative w-full">
      {/* Title Section */}
      {/* <div className="text-center mb-0">
        <h2 className="text-white text-4xl sm:text-6xl lg:text-2xl font-bold leading-tight uppercase">
          Boss Battle Events
        </h2>
      </div> */}

      {/* Carousel Section - Full Width */}
      <div className="relative w-full max-w-7xl mx-auto px-4">
        {/* Navigation Arrows */}
        <div className="absolute inset-0 h-[300px] flex items-center justify-between z-20 px-4">
          <button
            onClick={goToPrevious}
            className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-white/30 sm:text-purple-500 dark:text-white hover:scale-90 hover:bg-white dark:hover:bg-gray-700/20 duration-200 shadow-lg"
            aria-label="Previous event"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-white/30 sm:text-purple-500 dark:text-white hover:scale-90 hover:bg-white dark:hover:bg-gray-700/20 duration-200 shadow-lg"
            aria-label="Next event"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Cards Container */}
        <ul className="relative h-[300px]">
          {events.map((event, index) => (
            <li
              key={event.id}
              className={`absolute top-[50%] left-[50%] w-[350px] h-[350px] sm:w-[600px] sm:h-[338px] duration-500 cursor-pointer ${getCardPosition(index)}`}
              onClick={() => goToSlide(index)}
            >
              {/* Card with gradient border */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 p-[3px]">

                <div className="relative w-full h-full rounded-lg overflow-hidden bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/20">
                  {/* Dark overlay for better text contrast */}
                  <div className="absolute inset-0 bg-black/25 dark:bg-black/40"></div>
                  
                  {/* Event Image/Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={event.image} 
                      alt={event.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain opacity-30"
                    />
                  </div>
                  
                  {/* Event Content Overlay */}
                  <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col justify-between">
                    {/* Top Content */}
                    <div className="text-white">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-white drop-shadow-lg">{event.name}</h3>
                      
                      {/* Event Description */}
                      <p className="text-sm sm:text-base lg:text-lg text-white/90 dark:text-white/70 line-clamp-3 drop-shadow-md">
                        {event.description}
                      </p>
                    </div>

                    {/* Bottom Content */}
                    <div className="text-white text-center">
                      {/* Event Times */}
                      <div className="space-y-1 mb-3 sm:mb-4 text-white/90 dark:text-white/70 text-sm sm:text-base">
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-semibold">Start:</span>
                          <span>{event.startTime}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-semibold">End:</span>
                          <span>{event.endTime}</span>
                        </div>
                      </div>
                      
                      {/* Event Status */}
                      <div className="flex justify-center">
                        {event.isActive ? (
                          <div className="inline-flex items-center bg-green-500/20 text-green-300 px-3 py-2 rounded-full text-sm sm:text-base font-medium">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            Happening Now
                          </div>
                        ) : (
                          <div className="inline-block bg-yellow-500/20 text-yellow-300 px-3 py-2 rounded-full text-sm sm:text-base font-medium">
                            Coming Soon
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Dot Indicators - Centered */}
      <div className="flex justify-center space-x-2 mt-14">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-purple-600 dark:bg-white shadow-lg scale-125"
                : "bg-gray-400 dark:bg-white/40 hover:bg-purple-500 dark:hover:bg-white/60"
            }`}
            aria-label={`Go to event ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventCarousel2;
