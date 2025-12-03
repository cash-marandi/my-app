import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Event } from '@/types';

const DB_NAME = 'panorama_skill_development';
const COLLECTION_NAME = 'events';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const event = await db.collection<Event>(COLLECTION_NAME).findOne({ _id: new ObjectId(params.id) });
    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching event', error }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedEvent: Partial<Omit<Event, 'id'>> = await request.json();
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<Event>(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updatedEvent }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Event updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating event', error }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<Event>(COLLECTION_NAME).deleteOne({ _id: new ObjectId(params.id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting event', error }, { status: 500 });
  }
}
