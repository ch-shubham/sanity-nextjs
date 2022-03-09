import client, { previewClient } from "./sanity";
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

const getClient = (preview) => (preview ? previewClient : client);

export async function getAllBlogs() {
  try {
    return await client.fetch(
      `*[_type == "blog"] | order(date desc) {${blogFields}}`
    );
  } catch (error) {
    console.log("ERROR RECEIVED:", error);
    return;
  }
}

export async function getPaginatedBlogs(
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

export async function getBlogBySlug(slug, preview) {
  const currentClient = getClient(preview);
  return currentClient
    .fetch(
      `*[_type == 'blog' && slug.current == $slug]{
        ${blogFields}
        content[]{..., "asset":asset->}}`,
      {
        slug,
      }
    )
    .then((res) => (preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]));
}
