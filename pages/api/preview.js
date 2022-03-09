import { getBlogBySlug, getPaginatedBlogs } from "lib/api";
export default async function enablePreview(req, res) {
  if (
    req.query.secret !== process.env.SANITY_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  console.log(req.query.slug);
  const blog = await getBlogBySlug(req.query.slug, true);

  if (!blog) {
    return res.status(401).json({ message: "Invalid Slug" });
  }

  // it will set the cookies with the keys: __prerender_bypass and __next_preview_data
  res.setPreviewData({}); // it will set some cookies to the  browser, and then by these cookies nextjs can identify that we want to display our page in preview mode.
  res.writeHead(307, { Location: `/blogs/${blog.slug}` });
  res.end();
}
