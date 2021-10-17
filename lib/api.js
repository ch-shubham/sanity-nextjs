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

export async function getAllBlogs({ offset } = { offset: 0 }) {
  try {
    return await client.fetch(
      `*[_type == "blog"] | order(date desc) {${blogFields}}[${offset}...${
        offset + 3
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
