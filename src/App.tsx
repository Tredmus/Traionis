import React, { useEffect, useState } from 'react';
import { 
  Globe, 
  MessageSquare, 
  Users, 
  Mail,
  ChevronRight, 
  Github, 
  Twitter, 
  Linkedin,
  MessageCircle,
  X,
  Clock,
  Target,
  Scale,
  Star,
  ArrowRight,
  Calendar,
  Plus,
  Minus,
  Moon,
  Zap,
  DollarSign
} from 'lucide-react';

function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Website Creation",
      description: "Transform your online presence with AI-powered websites that convert visitors into customers. Our intelligent design systems adapt to user behavior, ensuring maximum engagement and ROI."
    },
    {
      icon: <MessageSquare className="w-12 h-12" />,
      title: "AI Customer Support",
      description: "Provide 24/7 instant support with our advanced AI agents. Cut support costs by 70% while improving customer satisfaction. Don't lose customers to slow response times."
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Conversational AI",
      description: "Deploy intelligent chatbots that understand context and emotion. Create natural conversations that build relationships with your customers, increasing engagement and sales."
    },
    {
      icon: <Mail className="w-12 h-12" />,
      title: "Mass Personalized Outreach",
      description: "Scale your outreach while maintaining a personal touch. Our AI crafts individually tailored messages that resonate with each recipient, boosting response rates by up to 300%."
    }
  ];

  const features = [
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Act Now or Fall Behind",
      description: "Every day without AI automation is a day your competitors gain ground. Early adopters are seeing 5x ROI - don't miss the revolution."
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "500% Revenue Growth",
      description: "Our clients consistently outperform their competitors with AI-driven insights and automation. The future belongs to AI-enabled businesses."
    },
    {
      icon: <Scale className="w-12 h-12" />,
      title: "Scale Without Limits",
      description: "While others hit growth ceilings, AI lets you scale infinitely. Automate today and watch your business grow exponentially."
    },
    {
      icon: <Moon className="w-12 h-12" />,
      title: "24/7 Operation",
      description: "Unlike human workers, AI operates around the clock without breaks. Maximize productivity with continuous operation and instant response times."
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Unmatched Efficiency",
      description: "AI maintains peak performance without fatigue. Process thousands of tasks simultaneously with consistent accuracy and zero human error."
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Cost Optimization",
      description: "Replace the workload of entire departments with AI solutions. Reduce operational costs by up to 80% while improving service quality."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechCorp",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150",
      quote: "Implementing AI was a game-changer. We've automated 80% of our routine tasks and our competition can't keep up. The ROI has been incredible.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "CEO, Global Logistics",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150",
      quote: "We hesitated at first, but now I regret not starting sooner. Our AI systems have given us a 3-year lead over competitors.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How quickly can I see results with AI implementation?",
      answer: "Most clients see significant improvements within the first 30 days. Our AI solutions start delivering value immediately, with ROI typically visible in the first quarter. Early adopters in your industry are already gaining market share - the time to act is now."
    },
    {
      question: "Is AI implementation complicated for my business?",
      answer: "Not at all. We handle the entire process, from setup to optimization. While your competitors struggle with manual processes, you'll be operating at peak efficiency with our seamless AI integration. The longer you wait, the more ground you'll have to make up."
    },
    {
      question: "How does AI give my business a competitive advantage?",
      answer: "AI provides unprecedented insights, automation, and scalability. Your competitors using traditional methods can't match the speed, efficiency, and personalization that AI delivers. Companies without AI will find it increasingly difficult to compete in the modern market."
    },
    {
      question: "What's the cost of not implementing AI now?",
      answer: "The cost of delay is substantial. Companies that postpone AI adoption typically see market share erosion of 20-30% within 18 months. Early adopters are creating insurmountable leads in customer experience, operational efficiency, and market intelligence."
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Floating gradient balls */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute bottom-1/4 left-2/3 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-transform duration-300 ${
        isNavVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Traionis
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
              <a href="#services" className="hover:text-purple-400 transition-colors">Services</a>
              <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
              <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
              <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Don't Let Your Competition
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Win the AI Race
            </span>
          </h1>
          <p className="text-xl sm:text-2xl mb-12 text-gray-300">
            The AI revolution is here. Companies that adapt now will dominate their markets. Those who wait will become irrelevant.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-lg font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
              Secure Your Future Now
            </button>
            <button className="px-8 py-4 border-2 border-purple-500/50 rounded-full text-lg font-semibold hover:bg-purple-500/10 transition-all duration-300">
              See How AI Transforms Business
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-24 bg-black/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Dominate Your Market</h2>
          <p className="text-xl text-gray-400 text-center mb-16">While others play catch-up, lead your industry with cutting-edge AI solutions</p>
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
                <div className="text-purple-400 mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <button className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                  Gain Your Advantage <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-black/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">The AI Advantage</h2>
          <p className="text-xl text-gray-400 text-center mb-16">Revolutionize your business with unmatched AI capabilities</p>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm">
                <div className="text-purple-400 mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-black/90">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Strategic AI Implementation</h2>
          <p className="text-xl text-gray-400 text-center mb-16">Get answers to critical questions about AI transformation</p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-purple-500/10 rounded-lg overflow-hidden">
                <button
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-purple-500/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="w-5 h-5 text-purple-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-purple-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="p-6 pt-0 text-gray-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Success Stories</h2>
          <div className="relative h-[300px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 absolute inset-0 ${
                  index === activeTestimonial ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className="bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-purple-500/10 rounded-2xl p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-xl">{testimonial.name}</h3>
                      <p className="text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-300 mb-4">"{testimonial.quote}"</p>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeTestimonial ? 'bg-purple-500' : 'bg-purple-500/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black/90 relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">The Time to Act is Now</h2>
          <p className="text-xl text-gray-400 text-center mb-8">Every day without AI is a day your competition gets ahead</p>
          
          <div className="flex justify-center gap-4 mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/90 to-blue-600/90 rounded-full px-4 py-2 text-sm">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Market Share at Risk
            </div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/90 to-blue-600/90 rounded-full px-4 py-2 text-sm">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Limited Time Offer
            </div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/90 to-blue-600/90 rounded-full px-4 py-2 text-sm">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Competitive Edge
            </div>
          </div>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-6 py-4 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors backdrop-blur-sm"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-6 py-4 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors backdrop-blur-sm"
            />
            <textarea
              placeholder="Tell us about your business challenges"
              rows={4}
              className="w-full px-6 py-4 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors backdrop-blur-sm"
            />
            <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-lg font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300">
              Begin Your Transformation
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-purple-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-4">
                Traionis
              </h3>
              <p className="text-gray-400">
                Leading the AI revolution in business transformation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">AI Insights</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
              </div>
              <p className="mt-4 text-gray-400">© 2025 Traionis. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <div className="bg-black border border-purple-500/30 rounded-2xl w-80 shadow-lg">
            <div className="p-4 border-b border-purple-500/30 flex justify-between items-center">
              <span className="font-semibold">AI Strategy Advisor</span>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-96 p-4">
              <div className="text-gray-400 text-sm">
                Ready to discuss your AI transformation strategy? I'm here to show you how to stay ahead of your competition.
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}

export default App;