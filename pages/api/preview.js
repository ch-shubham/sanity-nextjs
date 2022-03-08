import { getPaginatedBlogs } from "lib/api";
export default async function enablePreview(req, res) {
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  return res.status(200).json({ message: "Continue " });
}
