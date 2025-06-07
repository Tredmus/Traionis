import React from 'react';
import Logo from './Logo';
import { Linkedin, Twitter, Youtube, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-primary to-secondary text-white relative pt-16 pb-10">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M169.7,-208.9C215.2,-166,244.8,-110.2,259.3,-52.5C273.9,5.3,273.3,65,250.5,115.7C227.7,166.3,182.8,207.9,129.4,232C76,256.1,14.1,262.7,-39.8,247.9C-93.7,233.1,-139.5,196.9,-184.4,153.3C-229.3,109.7,-273.2,58.7,-282.8,-0.2C-292.4,-59.1,-267.6,-126,-224.7,-171.1C-181.7,-216.2,-120.5,-239.5,-61.2,-242.1C-1.9,-244.7,56.4,-226.7,111.1,-215.5C165.9,-204.3,219.2,-200,258.1,-169.6C297,-139.3,321.6,-82.9,328.1,-23.9C334.7,35.1,323.3,96.8,295.9,149.9C268.5,203.1,225.1,247.8,171.1,265.8C117.2,283.8,52.7,275,2.1,270.8C-48.4,266.6,-85,266.9,-135.2,255.6C-185.3,244.2,-249,221.2,-270.8,178.5C-292.5,135.8,-272.4,73.4,-271.9,13.1C-271.4,-47.2,-290.6,-106.5,-270.3,-149.3C-250,-192.1,-190.2,-218.5,-134.9,-236.9C-79.6,-255.3,-28.7,-265.7,16.7,-257C62,-248.3,101.7,-220.6,140.1,-198.3" transform="translate(400 400)" fill="none" strokeWidth="12" stroke="#ffffff" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-6">
              <Logo variant="alt" />
            </div>
            <p className="text-gray-300 mb-6">
              Online Growth Agency helping businesses scale through web design, AI automation, and strategic support.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Web Design & Development
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  AI & Workflow Automation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Growth Strategy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Digital Marketing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Conversion Optimization
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Blog & Insights
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Client Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Team
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Traionis. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;