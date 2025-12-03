// @ts-nocheck

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NewsPost } from '@/types';

const DB_NAME = 'panorama_skill_development';
const COLLECTION_NAME = 'news_posts';

export async function GET(request: Request, context: { params: Promise<{ id: string; }> }) {
  try {
    const resolvedParams = await context.params;
    const { id } = resolvedParams;

    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (e) {
      return NextResponse.json({ message: 'Invalid News post ID format' }, { status: 400 });
    }

    const post = await db.collection<NewsPost>(COLLECTION_NAME).findOne({ _id: objectId });

    if (!post) {
      return NextResponse.json({ message: 'News post not found' }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching news post', error }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string; }> }) {
  try {
    const resolvedParams = await context.params;
    const { id } = resolvedParams;

    const updatedPost: Partial<Omit<NewsPost, 'id'>> = await request.json();
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<NewsPost>(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) }, // Use the resolved ID
      { $set: updatedPost }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'News post not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'News post updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating news post', error }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string; }> }) {
  try {
    const resolvedParams = await context.params;
    const { id } = resolvedParams;

    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<NewsPost>(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) }); // Use the resolved ID
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'News post not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'News post deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting news post', error }, { status: 500 });
  }
}
