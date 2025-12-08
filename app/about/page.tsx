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
              Panorama Skills Development Center is a non-profit organization based in The City of Mbombela, established in 2016. Our aim is to bridge the gap of unemployment and lack of skills amongst women and youth. We focus on women empowerment and development through life skills seminars and workshops, educating and sharing information to hinder their development and decrease the unemployment and poverty rate in communities.
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
              <p className="text-gray-600">To bridge the gap of unemployment by providing skills development to the unskilled and unemployable women and youth, and to link beneficiaries or participants to potential employers.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="text-2xl font-serif font-bold text-blue-950 mb-4">Our Vision</h3>
              <p className="text-gray-600">To facilitate communication between other organisations interested in the development of skills for young people and women, and to offer awareness on gender based violence to women at large and provide capacity building and support to gender based violence victims.</p>
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
              { year: '2016', title: 'Foundation', desc: 'Panorama SDC was established by a group of passionate men and women to bridge the gap of unemployment.' },
              { year: '2019-2025', title: 'Empowering Women', desc: 'Reached 9207 women through life skills seminars and workshops.' },
              { year: '2019-2025', title: 'Supporting Youth', desc: 'Reached 303 school girls through personal development programs and provided sanitary towels.' },
              { year: '2019-2025', title: 'Skills Training', desc: 'A total number of 264 of participants where empowered through shop assistance housekeeping and hair dressing trainings' },
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
