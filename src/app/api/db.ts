import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

const client = new MongoClient(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.dqst3xt.mongodb.net/?appName=Cluster0`,
);

export async function connectToMongoDB() {
  if (cachedClient && cachedDb) {
    return { client, cachedClient, db: cachedDb };
  }
  await client.connect();
  console.log('You successfully connected to MongoDB!');

  cachedClient = client;
  cachedDb = client.db();

  return { client, db: client.db() };
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}
