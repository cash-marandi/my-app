'use client';

import Link from 'next/link'; // Changed import
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Lock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <img 
              src="/images/logo.png" 
              alt="Panorama SDC Logo" 
              className="h-10 w-auto" 
              style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))' }} // Added white drop shadow
            />
            <p className="text-sm leading-relaxed text-slate-400">
              Empowering communities through skills development, education, and sustainable growth initiatives in White River, Mpumalanga.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li> {/* Changed to href */}
              <li><Link href="/services" className="hover:text-primary-400 transition-colors">Our Programs</Link></li> {/* Changed to href */}
              <li><Link href="/events" className="hover:text-primary-400 transition-colors">Events</Link></li> {/* Changed to href */}
              <li><Link href="/news" className="hover:text-primary-400 transition-colors">Latest News</Link></li> {/* Changed to href */}
              <li><Link href="/admin/login" className="flex items-center gap-1 hover:text-primary-400 transition-colors"><Lock size={12}/> Admin Area</Link></li> {/* Changed to href */}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-500 flex-shrink-0 mt-0.5" />
                <span>123 Panorama Drive, White River,<br />Mpumalanga, 1240</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500 flex-shrink-0" />
                <span>+27 13 750 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500 flex-shrink-0" />
                <span>info@panoramasdc.org.za</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-xs text-slate-400 mb-4">Subscribe to our newsletter for updates.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-slate-800 border border-slate-700 text-white px-3 py-2 rounded-lg text-sm w-full focus:outline-none focus:border-primary-500"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded-lg transition-colors">
                Go
              </button>
            </form>
            <div className="flex gap-4 mt-6">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Panorama Skill Development Centre. All rights reserved.</p>
          <p className="mt-2">
            Website built by{' '}
            <a href="https://www.livelonke.co.za" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Live Lonke ICT
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;