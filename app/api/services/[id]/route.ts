import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Service } from '@/types';

const DB_NAME = 'panorama_skill_development';
const COLLECTION_NAME = 'services';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const service = await db.collection<Service>(COLLECTION_NAME).findOne({ _id: new ObjectId(params.id) });
    if (!service) {
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching service', error }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedService: Partial<Omit<Service, 'id'>> = await request.json();
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<Service>(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(params.id) },
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<Service>(COLLECTION_NAME).deleteOne({ _id: new ObjectId(params.id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Service deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting service', error }, { status: 500 });
  }
}
