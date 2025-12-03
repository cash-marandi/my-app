// @ts-nocheck

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Event } from '@/types';

const DB_NAME = 'panorama_skill_development';
const COLLECTION_NAME = 'events';

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
      return NextResponse.json({ message: 'Invalid Event ID format' }, { status: 400 });
    }

    const event = await db.collection<Event>(COLLECTION_NAME).findOne({ _id: objectId });
    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching event', error }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string; }> }) {
  try {
    const resolvedParams = await context.params;
    const { id } = resolvedParams;

    const updatedEvent: Partial<Omit<Event, 'id'>> = await request.json();
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<Event>(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) }, // Use the resolved ID
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

export async function DELETE(request: Request, context: { params: Promise<{ id: string; }> }) {
  try {
    const resolvedParams = await context.params;
    const { id } = resolvedParams;

    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<Event>(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting event', error }, { status: 500 });
  }
}
