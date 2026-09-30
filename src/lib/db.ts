import { MongoClient, Db } from 'mongodb';

const client = new MongoClient(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.dqst3xt.mongodb.net/?appName=Cluster0`,
);

// reused across requests while the function instance stays warm
let cachedDb: Db | null = null;

export async function connectToMongoDB() {
  if (cachedDb) {
    return { client, db: cachedDb };
  }
  await client.connect();
  console.log('You successfully connected to MongoDB!');

  cachedDb = client.db();

  return { client, db: cachedDb };
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}
