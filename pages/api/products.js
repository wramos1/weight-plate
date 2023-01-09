import { fetchProducts } from "../../utils/fetchProducts";

export default async function handler(req, res) {
  const data = await fetchProducts();
  res.status(200).json({ data })
}
