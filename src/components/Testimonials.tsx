import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Traionis transformed our online presence – our sales doubled in 3 months. The team truly feels like part of our company. They delivered beyond our expectations.",
    author: "Jane Doe",
    position: "CEO",
    company: "RetailStar Inc.",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    quote: "The AI automation system that Traionis implemented saved us 20+ hours per week in manual work. Their strategic approach to solving business problems is refreshing.",
    author: "Michael Smith",
    position: "Operations Director",
    company: "TechSolutions Ltd.",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    quote: "Working with Traionis has been game-changing for our e-commerce business. Their attention to detail and focus on conversion optimization has transformed our results.",
    author: "Sarah Johnson",
    position: "Marketing Manager",
    company: "StyleShop Co.",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  useEffect(() => {
    // Setup autoplay
    autoplayRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);
  
  const resetAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      nextSlide();
    }, 6000);
  };
  
  const handleNavClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    resetAutoplay();
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our happy clients.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <Quote className="absolute top-0 left-0 h-16 w-16 text-primary/20 transform -translate-x-1/2 -translate-y-1/2" />
          
          <div 
            ref={sliderRef}
            className="relative overflow-hidden rounded-2xl bg-white shadow-xl p-8 md:p-12"
          >
            <div 
              className="transition-transform duration-500 ease-in-out flex" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <blockquote className="mb-8">
                    <p className="text-lg md:text-xl italic text-gray-700 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </blockquote>
                  
                  <div className="flex items-center">
                    <div className="h-14 w-14 rounded-full overflow-hidden mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.author}</p>
                      <p className="text-gray-600">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
              onClick={() => {
                prevSlide();
                resetAutoplay();
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800" />
            </button>
            
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
              onClick={() => {
                nextSlide();
                resetAutoplay();
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-gray-800" />
            </button>
          </div>
          
          {/* Dots Navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;