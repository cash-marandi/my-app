import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Event } from '@/types';

const DB_NAME = 'panorama_skill_development';
const COLLECTION_NAME = 'events';

export async function GET() {
  try {
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const events = await db.collection<Event>(COLLECTION_NAME).find({}).toArray();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching events', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newEvent: Omit<Event, 'id'> = await request.json();
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<Omit<Event, 'id'>>(COLLECTION_NAME).insertOne(newEvent);
    return NextResponse.json({ message: 'Event added successfully', newEventId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding event', error }, { status: 500 });
  }
}
