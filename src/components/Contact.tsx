import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Twitter, Instagram } from 'lucide-react';
import Button from './Button';
import FloatingDots from './FloatingDots';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <FloatingDots />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's Talk Growth
          </h2>
          <p className="text-xl text-gray-600">
            Have a project or question? Drop us a line.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company (optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                  placeholder="How can we help?"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Contact Details
              </h3>
              <div className="space-y-4">
                <a href="mailto:hello@traionis.com" className="flex items-center text-gray-600 hover:text-primary transition-colors">
                  <Mail className="h-5 w-5 mr-3" />
                  hello@traionis.com
                </a>
                <a href="tel:+35988123456" className="flex items-center text-gray-600 hover:text-primary transition-colors">
                  <Phone className="h-5 w-5 mr-3" />
                  +359 88 123 4567
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Office Hours
              </h3>
              <p className="text-gray-600">
                Monday - Friday:<br />
                9:00 AM - 6:00 PM EET<br />
                Saturday - Sunday:<br />
                Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;