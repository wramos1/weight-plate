import { fetchCollections } from "../../utils/fetchCollections";

export default async function handler(req, res) {
  const data = await fetchCollections();
  res.status(200).json({ collections: data.collections.edges })
} 