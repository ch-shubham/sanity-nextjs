import client from "./sanity";

const blogFields = `
title,
subtitle,
'slug':slug.current, 
date,
'coverImage': coverImage.asset->url,
'author': author->{name, 'avatar': avatar.asset->url},
`;
// 'slug':slug.current means that slug is the key with value of slug.current.
// ->url is used to get the url from the referene. More details on official docs.

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
    .fetch(`*[_type == 'blog' && slug.current == $slug]{${blogFields}}`, {
      slug,
    })
    .then((res) => res[0]);
}
