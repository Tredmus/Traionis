import React, { useEffect, useState } from 'react';
import { 
  Rocket, 
  Cog, 
  Handshake, 
  ChevronRight, 
  Github, 
  Twitter, 
  Linkedin,
  MessageCircle,
  X
} from 'lucide-react';

function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const features = [
    {
      icon: <Cog className="w-12 h-12" />,
      title: "Automate Any Process",
      description: "Traionis harnesses AI to streamline complex workflows, saving time and resources."
    },
    {
      icon: <Rocket className="w-12 h-12" />,
      title: "Boost Business Growth",
      description: "Scalable solutions tailored to your business needs for maximum impact."
    },
    {
      icon: <Handshake className="w-12 h-12" />,
      title: "Expert Support",
      description: "Our team provides hands-on expertise to ensure seamless AI integration."
    }
  ];

  const caseStudies = [
    {
      client: "TechCorp Inc.",
      highlight: "Reduced operational costs by 40% through AI automation",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800"
    },
    {
      client: "Global Logistics",
      highlight: "Improved delivery efficiency by 60% with AI routing",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800"
    },
    {
      client: "FinanceHub",
      highlight: "90% faster document processing with AI analysis",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
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
              <a href="#features" className="hover:text-purple-400 transition-colors">Solutions</a>
              <a href="#case-studies" className="hover:text-purple-400 transition-colors">Case Studies</a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 leading-tight">
            NEXT-GEN AI
            <br />
            AUTOMATION SOLUTIONS
          </h1>
          <p className="text-xl sm:text-2xl mb-12 text-gray-300">
            Empowering businesses to automate, innovate, and scale effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-lg font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
              Get Started
            </button>
            <button className="px-8 py-4 border-2 border-purple-500/50 rounded-full text-lg font-semibold hover:bg-purple-500/10 transition-all duration-300">
              Explore Solutions
            </button>
          </div>
        </div>
        
        {/* Animated Background Element */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 bg-black/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Traionis?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300">
                <div className="text-purple-400 mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Proven Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl">
                <img 
                  src={study.image} 
                  alt={study.client} 
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold mb-2">{study.client}</h3>
                  <p className="text-gray-300 mb-4">{study.highlight}</p>
                  <button className="flex items-center text-purple-400 hover:text-purple-300 transition-colors">
                    View Details <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black/90">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Ready to Transform Your Business?</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-6 py-4 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-6 py-4 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <input
              type="text"
              placeholder="Company"
              className="w-full px-6 py-4 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-6 py-4 bg-purple-900/20 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-lg font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
              Get in Touch
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
                Next-generation AI automation solutions for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
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
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <div className="bg-black border border-purple-500/30 rounded-2xl w-80 shadow-lg">
            <div className="p-4 border-b border-purple-500/30 flex justify-between items-center">
              <span className="font-semibold">Traionis Assistant</span>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-96 p-4">
              <div className="text-gray-400 text-sm">
                Hello! How can I help you today with AI automation?
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