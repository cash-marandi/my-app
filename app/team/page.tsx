'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// import { db } from '@/services/mockDb'; // REMOVE THIS IMPORT
import { TeamMember } from '@/types';

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Added error state

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch('/api/team');
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch team data: ${res.status} ${errorText}`);
        }
        const data: (TeamMember & { _id: string })[] = await res.json();
        setTeam(data.map(member => ({ ...member, id: member._id }))); // Map _id to id
      } catch (err: any) {
        console.error("Error fetching team:", err);
        setError(err.message || 'Failed to load team members.');
        setTeam([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  if (error) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Meet Our Team</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The dedicated individuals working tirelessly behind the scenes to make a difference.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.length === 0 ? (
                <p className="text-gray-500 col-span-full text-center py-10">No team members found.</p>
            ) : (
                team.map((member, idx) => (
                    <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative"
                    >
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 mb-6 shadow-md">
                        <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <p className="text-white text-sm">{member.bio}</p>
                        </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                        <p className="text-primary-600 font-medium">{member.role}</p>
                    </motion.div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}