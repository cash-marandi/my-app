import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NewsPost } from '@/types';

const DB_NAME = 'panorama_skill_development';
const COLLECTION_NAME = 'news_posts';

export async function GET(request: Request, context: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    const resolvedParams = await context.params;
    const id = resolvedParams.id;

    console.log("API: News GET request for ID:", id); // Log incoming ID
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    let objectId;
    try {
      objectId = new ObjectId(id); // Use the resolved ID
      console.log("API: Created ObjectId from params.id:", objectId); // Log created ObjectId
    } catch (e) {
      console.error("API: Invalid ObjectId format for ID from params:", id, e);
      return NextResponse.json({ message: 'Invalid News post ID format' }, { status: 400 });
    }

    const post = await db.collection<NewsPost>(COLLECTION_NAME).findOne({ _id: objectId });
    console.log("API: findOne result:", post); // Log findOne result

    if (!post) {
      return NextResponse.json({ message: 'News post not found' }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("API: Error in News GET:", error); // Log catch block errors
    return NextResponse.json({ message: 'Error fetching news post', error }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedPost: Partial<Omit<NewsPost, 'id'>> = await request.json();
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<NewsPost>(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(params.id) },
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<NewsPost>(COLLECTION_NAME).deleteOne({ _id: new ObjectId(params.id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'News post not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'News post deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting news post', error }, { status: 500 });
  }
}
