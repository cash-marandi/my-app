'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // Added Link import
// import { db } from '@/services/mockDb'; // REMOVE THIS IMPORT
import { NewsPost } from '@/types';
import Card from '@/components/UI/Card';

export default function News() {
  const [news, setNews] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Added error state

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch news: ${res.status} ${errorText}`);
        }
        const data: (NewsPost & { _id: string })[] = await res.json();
        setNews(data.map(post => ({ ...post, id: post._id }))); // Map _id to id
      } catch (err: any) {
        console.error("Error fetching news:", err);
        setError(err.message || 'Failed to load news.');
        setNews([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
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
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-12">Latest News</h1>

        {loading ? (
           <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.length === 0 ? (
                <p className="text-gray-500 col-span-full text-center py-10">No news found.</p>
            ) : (
                news.map((item, idx) => (
                    <Card key={item.id} delay={idx * 0.1}>
                        <div className="h-56 overflow-hidden">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-6">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold text-primary-600 uppercase tracking-wide">{item.category}</span>
                            <span className="text-xs text-gray-400">{item.date}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.excerpt}</p>
                        <Link href={`/news/${item.id}`} className="text-primary-600 font-medium text-sm hover:underline">Read Article</Link>
                        </div>
                    </Card>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}