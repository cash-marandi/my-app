import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { TeamMember } from '@/types';

const DB_NAME = 'panorama_skill_development';
const COLLECTION_NAME = 'team_members';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const member = await db.collection<TeamMember>(COLLECTION_NAME).findOne({ _id: new ObjectId(params.id) });
    if (!member) {
      return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json(member, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching team member', error }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedMember: Partial<Omit<TeamMember, 'id'>> = await request.json();
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<TeamMember>(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(params.id) },
      { $set: updatedMember }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Team member updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating team member', error }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id:string } }) {
  try {
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<TeamMember>(COLLECTION_NAME).deleteOne({ _id: new ObjectId(params.id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Team member deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting team member', error }, { status: 500 });
  }
}
