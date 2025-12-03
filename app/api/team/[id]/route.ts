// @ts-nocheck

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { TeamMember } from '@/types';

const DB_NAME = 'panorama_skill_development';
const COLLECTION_NAME = 'team_members';

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
      return NextResponse.json({ message: 'Invalid Team member ID format' }, { status: 400 });
    }

    const member = await db.collection<TeamMember>(COLLECTION_NAME).findOne({ _id: objectId });
    if (!member) {
      return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
    }
    return NextResponse.json(member, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching team member', error }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string; }> }) {
  try {
    const resolvedParams = await context.params;
    const { id } = resolvedParams;

    const updatedMember: Partial<Omit<TeamMember, 'id'>> = await request.json();
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<TeamMember>(COLLECTION_NAME).updateOne(
      { _id: new ObjectId(id) }, // Use the resolved ID
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

export async function DELETE(request: Request, context: { params: Promise<{ id: string; }> }) {

  try {

    const resolvedParams = await context.params;

    const { id } = resolvedParams;



    const { client } = await connectToDatabase();

    const db = client.db(DB_NAME);

    const result = await db.collection<TeamMember>(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {

      return NextResponse.json({ message: 'Team member not found' }, { status: 404 });

    }

    return NextResponse.json({ message: 'Team member deleted successfully' }, { status: 200 });

  } catch (error) {

    return NextResponse.json({ message: 'Error deleting team member', error }, { status: 500 });

  }

}
