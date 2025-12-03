'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="bg-white pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-blue-950 mb-6">About Panorama</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are a non-profit organization dedicated to uplifting the community of White River through education, skills development, and social cohesion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="text-2xl font-serif font-bold text-blue-950 mb-4">Our Mission</h3>
              <p className="text-gray-600">To equip individuals with relevant skills that foster economic independence and personal growth.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="text-2xl font-serif font-bold text-blue-950 mb-4">Our Vision</h3>
              <p className="text-gray-600">A thriving, skilled, and self-sufficient community where opportunity is accessible to all.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className=" p-8 rounded-2xl shadow-sm bg-white border border-gray-100"
            >
              <h3 className="text-2xl font-serif font-bold text-blue-950 mb-4">Our Values</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Integrity</li>
                <li>• Excellence</li>
                <li>• Inclusivity</li>
                <li>• Community-Centric</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History / Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Journey</h2>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-blue-100 before:from-transparent before:via-slate-300 before:to-transparent">
            {[
              { year: '2015', title: 'Foundation', desc: 'Panorama SDC was established by a group of passionate educators.' },
              { year: '2018', title: 'First Training Centre', desc: 'Opened our first physical location in White River town center.' },
              { year: '2020', title: 'Digital Expansion', desc: 'Launched online programs to support remote learning during the pandemic.' },
              { year: '2023', title: 'Reaching 5000+', desc: 'Celebrated the milestone of impacting over 5000 lives through our programs.' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-950 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900">{item.title}</div>
                    <time className="font-caveat font-medium text-primary-600">{item.year}</time>
                  </div>
                  <div className="text-slate-500 text-sm">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
