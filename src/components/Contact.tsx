import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Twitter, Instagram, CheckCircle, Loader2 } from 'lucide-react';
import Button from './Button';
import FloatingDots from './FloatingDots';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting || isSubmitted) return;
    
    setIsSubmitting(true);
    
    try {
      const form = e.target as HTMLFormElement;
      const formDataToSend = new FormData(form);
      
      const response = await fetch('https://formsubmit.co/info@traionis.com', {
        method: 'POST',
        body: formDataToSend
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      <FloatingDots />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's Talk Business
          </h2>
          <p className="text-xl text-gray-600">
            Have a project or question? Drop us a line.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="mb-6">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Hidden fields for FormSubmit configuration */}
                <input type="hidden" name="_subject" value="New contact form submission from Traionis website" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value="https://musical-yeot-928849.netlify.app/#contact" />
                
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="How can we help?"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${
                    isSubmitting ? 'pointer-events-none' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Sending Message...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;