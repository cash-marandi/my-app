import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Service } from '@/types';

const DB_NAME = 'panorama_skill_development';
const COLLECTION_NAME = 'services';

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
      return NextResponse.json({ message: 'Invalid Service ID format' }, { status: 400 });
    }

    const service = await db.collection<Service>(COLLECTION_NAME).findOne({ _id: objectId });
    if (!service) {
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching service', error }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string; }> }) {
  try {
    const resolvedParams = await context.params;
    const { id } = resolvedParams;

    const updatedService: Partial<Omit<Service, 'id'>> = await request.json();
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<Service>(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) }, // Use the resolved ID
      { $set: updatedService }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Service updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating service', error }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string; }> }) {
  try {
    const resolvedParams = await context.params;
    const { id } = resolvedParams;

    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<Service>(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Service deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting service', error }, { status: 500 });
  }
}