import client from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

const blogFields = `
title,
subtitle,
'slug':slug.current, 
date,
coverImage,
'author': author->{name, 'avatar': avatar.asset->url},
`;
// 'slug':slug.current means that slug is the key with value of slug.current.
// ->url is used to get the url from the referene. More details on official docs.

export function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

export async function getAllBlogs() {
  // fetch takes the query as parameter. https://www.sanity.io/docs/query-cheat-sheet
  try {
    // return await client.fetch(`*[_type == "blog"]`); //type is basically the name identifier of document schema type.

    return await client.fetch(`*[_type == "blog"]{${blogFields}}`); //{} are the project. More details on official docs
  } catch (error) {
    console.log("ERROR RECEIVED:", error);
    return;
  }
}

export async function getBlogBySlug(slug) {
  return client
    .fetch(
      `*[_type == 'blog' && slug.current == $slug]{
        ${blogFields}
        content[]{..., "asset":asset->}}`,
      {
        slug,
      }
    )
    .then((res) => res[0]);
}
