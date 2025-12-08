'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Hammer, Laptop, Users, Briefcase, ChevronRight, Award, ShoppingCart, DollarSign, Heart } from 'lucide-react';
import { db } from '@/services/mockDb';
import { Service } from '@/types';

const iconMap: Record<string, React.ReactElement> = {
  Hammer: <Hammer size={32} />,
  Laptop: <Laptop size={32} />,
  Users: <Users size={32} />,
  Briefcase: <Briefcase size={32} />,
  Award: <Award size={32} />,
  ShoppingCart: <ShoppingCart size={32} />,
  DollarSign: <DollarSign size={32} />,
  Heart: <Heart size={32} />,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    db.getServices().then(setServices);
  }, []);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Our Programs</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We offer a diverse range of skills development programs designed to meet the needs of our community and the local economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors flex-shrink-0">
                  {iconMap[service.icon] || <Users size={32} />}
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <button className="flex items-center text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                    Learn More <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-gray-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold mb-4">Ready to start your journey?</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">Enrolment for our next intake is now open. Contact us today to secure your spot.</p>
            <a href="/contact" className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 rounded-full font-medium transition-colors">
              Contact Us Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
