import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set.");
  }
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("quiet-hours");
    const collections = await db.collections();
    console.log(
      "Collections:",
      collections.map((c) => c.collectionName)
    );
  } catch (err) {
    console.error("DB connection error:", err);
  } finally {
    await client.close();
  }
}

testConnection();
