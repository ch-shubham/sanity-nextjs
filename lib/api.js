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

export function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

export async function getAllBlogs(
  { offset, date } = { offset: 0, date: "desc" }
) {
  try {
    return await client.fetch(
      `*[_type == "blog"] | order(date ${date}) {${blogFields}}[${offset}...${
        offset + 6
      }]`
    );
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
