import { MongoClient } from 'mongodb';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error(
    'Please define the MONGODB_URL environment variable inside .env.local'
  );
}

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return { client: cachedClient };
  }

  const client = new MongoClient(MONGODB_URL!);

  await client.connect();
  
  cachedClient = client;

  return { client };
}
