'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
// import { db } from '@/services/mockDb'; // REMOVE THIS IMPORT
import { Event } from '@/types';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Added error state

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch events: ${res.status} ${errorText}`);
        }
        const data: (Event & { _id: string })[] = await res.json();
        setEvents(data.map(event => ({ ...event, id: event._id }))); // Map _id to id
      } catch (err: any) {
        console.error("Error fetching events:", err);
        setError(err.message || 'Failed to load events.');
        setEvents([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (error) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-12">Events & Workshops</h1>
        
        {loading ? (
           <p>Loading...</p>
        ) : (
          <div className="space-y-6">
            {events.length === 0 ? (
                <p className="text-gray-500 text-center py-10">No events found.</p>
            ) : (
                events.map((event, idx) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow"
                    >
                        <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded shadow text-sm font-bold md:hidden">
                            {event.date}
                        </div>
                        </div>
                        <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center gap-1 text-primary-600 font-semibold"><Calendar size={16}/> {event.date}</span>
                            <span className="flex items-center gap-1"><MapPin size={16}/> {event.location}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                        <p className="text-gray-600 mb-6">{event.description}</p>
                        <button className="self-start px-6 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors">
                            View Details
                        </button>
                        </div>
                    </motion.div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}