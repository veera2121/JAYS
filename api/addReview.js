import clientPromise from "./mongoClient";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { name, review, rating } = req.body;
  const client = await clientPromise;
  const db = client.db("reviewsDB");  // your DB name

  await db.collection("reviews").insertOne({ name, review, rating });
  res.json({ message: "Review saved!" });
}
