'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, BookOpen, Trophy, Calendar } from 'lucide-react';
import Link from 'next/link';
import Card from '@/components/UI/Card';
// import { db } from '@/services/mockDb'; // REMOVE THIS IMPORT
import { Event, NewsPost } from '@/types'; 

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<NewsPost[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingNews, setLoadingNews] = useState(true);
  const [errorEvents, setErrorEvents] = useState<string | null>(null);
  const [errorNews, setErrorNews] = useState<string | null>(null);


  useEffect(() => {  
    const fetchHomeData = async () => {
      // Fetch Events
      try {
        const eventsRes = await fetch('/api/events');
        if (!eventsRes.ok) {
          const errorText = await eventsRes.text();
          throw new Error(`Failed to fetch events: ${eventsRes.status} ${errorText}`);
        }
        const eventsData: (Event & { _id: string })[] = await eventsRes.json();
        setEvents(eventsData.map(event => ({ ...event, id: event._id })).slice(0, 3));
      } catch (err: any) {
        console.error("Error fetching events for homepage:", err);
        setErrorEvents(err.message || 'Failed to load upcoming events.');
      } finally {
        setLoadingEvents(false);
      }

      // Fetch News
      try {
        const newsRes = await fetch('/api/news');
        if (!newsRes.ok) {
          const errorText = await newsRes.text();
          throw new Error(`Failed to fetch news: ${newsRes.status} ${errorText}`);
        }
        const newsData: (NewsPost & { _id: string })[] = await newsRes.json();
        setNews(newsData.map(post => ({ ...post, id: post._id })).slice(0, 3));
      } catch (err: any) {
        console.error("Error fetching news for homepage:", err);
        setErrorNews(err.message || 'Failed to load latest news.');
      } finally {
        setLoadingNews(false);
      }
    };
    fetchHomeData();
  }, []);

  // Display error if any
  if (errorEvents || errorNews) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-red-500 text-lg">{errorEvents || errorNews}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-200/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-2 rounded-full bg-blue-950 border border-gray-200 text-white font-medium text-sm mb-6 shadow-sm">
                Building a brighter future together
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-tight mb-6">
                Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r font-color1 from-primary-600 to-secondary-500">Skills</span>,
                Uplifting Lives.
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
                Panorama Skill Development Centre provides world-class vocational training and community programs in White River, Mpumalanga.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/services" className="px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 group">
                  Our Programs
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/about" className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md">
                  About Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
                <img
                  src="/images/7.jpg"
                  alt="Students learning"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-20 left-6 right-6 text-white">
                  <p className="font-serif italic text-lg">"Education is the most powerful weapon which you can use to change the world."</p>
                </div>
              </div>

              {/* Floating Stat Card */}
              <motion.div
                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs animate-float"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-100 text-green-900 rounded-xl">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-green-900">500+</p>
                    <p className="text-sm text-gray-500">Lives Impacted Yearly</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Why Choose Panorama?</h2>
            <p className="text-gray-600">We are dedicated to providing holistic development through accredited training and community support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Accredited Training", desc: "Recognized certifications that open doors to employment." },
              { icon: Users, title: "Community Driven", desc: "Programs designed by the community, for the community." },
              { icon: Trophy, title: "Expert Mentorship", desc: "Learn from industry professionals with real-world experience." },
            ].map((feature, idx) => (
              <Card key={idx} delay={idx * 0.1} className="p-8 hover:bg-blue-100 hover:border-blue-900 group">
                <div className="w-14 h-14 bg-blue-950 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">Upcoming Events</h2>
              <p className="text-gray-600">Join us in our upcoming workshops and gatherings.</p>
            </div>
            <Link href="/events" className="hidden md:flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loadingEvents ? (
              <p className="text-gray-500 col-span-3 text-center py-10">Loading events...</p>
            ) : events.length === 0 ? (
              <p className="text-gray-500 col-span-3 text-center py-10">No upcoming events found.</p>
            ) : (
              events.map((event, idx) => (
                <Card key={event.id} delay={idx * 0.1} className="flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-bold shadow-sm">
                      {event.date}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 uppercase tracking-wider">
                      <Calendar size={12} />
                      {event.location}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">{event.description}</p>
                    <Link href={`/events`} className="text-primary-600 font-medium text-sm hover:underline mt-auto">Read More</Link>
                  </div>
                </Card>
              ))
            )}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/events" className="inline-flex items-center gap-2 text-primary-600 font-medium">
              View All Events <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}