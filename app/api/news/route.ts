import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { NewsPost } from '@/types';

const DB_NAME = 'panorama_skill_development';
const COLLECTION_NAME = 'news_posts';

export async function GET() {
  try {
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const news = await db.collection<NewsPost>(COLLECTION_NAME).find({}).toArray();
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching news posts', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newPost: Omit<NewsPost, 'id'> = await request.json();
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<Omit<NewsPost, 'id'>>(COLLECTION_NAME).insertOne(newPost);
    return NextResponse.json({ message: 'News post added successfully', newPostId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding news post', error }, { status: 500 });
  }
}
