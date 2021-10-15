import client from "./sanity";

const blogFields = `
title,
subtitle,
'slug':slug.current
`;

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
