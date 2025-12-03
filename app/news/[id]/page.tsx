'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { NewsPost } from '@/types';
import { Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>(); // Get ID from URL params
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("News article ID is missing.");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/news/${id}`);
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch news article: ${res.status} ${errorText}`);
        }
        const data: (NewsPost & { _id: string }) = await res.json();
        setPost({ ...data, id: data._id }); // Map _id to id
      } catch (err: any) {
        console.error("Error fetching news article:", err);
        setError(err.message || 'Failed to load news article.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">News article not found.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/news" className="text-primary-600 hover:underline mb-4 inline-block">&larr; Back to News</Link>
        <img src={post.imageUrl} alt={post.title} className="w-full h-96 object-cover rounded-lg shadow-md mb-6" />
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center space-x-4 text-gray-500 text-sm mb-6">
          <span className="flex items-center gap-1"><Calendar size={16}/> {post.date}</span>
          <span className="flex items-center gap-1"><Tag size={16}/> {post.category}</span>
        </div>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}
