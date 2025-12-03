import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { TeamMember } from '@/types';

const DB_NAME = 'panorama_skill_development';
const COLLECTION_NAME = 'team_members';

export async function GET() {
  try {
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const team = await db.collection<TeamMember>(COLLECTION_NAME).find({}).toArray();
    return NextResponse.json(team, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching team members', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newMember: Omit<TeamMember, 'id'> = await request.json();
    const { client } = await connectToDatabase();
    const db = client.db(DB_NAME);
    const result = await db.collection<Omit<TeamMember, 'id'>>(COLLECTION_NAME).insertOne(newMember);
    return NextResponse.json({ message: 'Team member added successfully', newMemberId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding team member', error }, { status: 500 });
  }
}
