import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {['Services', 'Work' ,'Process', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="font-medium text-gray-800 hover:text-primary transition-colors relative group"
            >
              {item}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="#contact"
            className="bg-gradient-to-r from-primary to-secondary hover:bg-primary-light text-white px-6 py-2 rounded-full flex items-center transition-all duration-300 hover:shadow-lg"
          >
            Get Started
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 pt-20 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto px-6 flex flex-col space-y-6 py-8">
          {['Services', 'Work' ,'Process', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-xl font-medium text-gray-800 hover:text-primary transition-colors py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a 
            href="#contact"
            className="bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-full flex items-center justify-center transition-all duration-300 mt-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;