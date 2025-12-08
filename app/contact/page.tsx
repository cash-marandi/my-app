'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, subject, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(data.message);
        setFirstName('');
        setLastName('');
        setEmail('');
        setSubject('General Inquiry');
        setMessage('');
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Get in Touch</h1>
              <p className="text-lg text-gray-600">Have questions about our programs or want to get involved? We'd love to hear from you.</p>
            </div>

                          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary-50 rounded-lg text-primary-600">
                              <MapPin size={24} />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">Visit Us</h3>
                              <p className="text-gray-600">Corner of Joe Hannah in Williem Swanepol street 1240,<br/>White River, 1240</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary-50 rounded-lg text-primary-600">
                              <Phone size={24} />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">Call Us</h3>
                              <p className="text-gray-600">071 595 3760</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary-50 rounded-lg text-primary-600">
                              <Mail size={24} />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">Email Us</h3>
                              <p className="text-gray-600">PanoramaskillsDev@gmail.com</p>
                            </div>
                          </div>
                        </div>

          </motion.div>

          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    id="firstName"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select 
                  id="subject"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option>General Inquiry</option>
                  <option>Program Enrolment</option>
                  <option>Donation / Partnership</option>
                  <option>Press / Media</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message"
                  rows={4} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-4 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl transition-colors shadow-lg shadow-primary-200"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
              {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
