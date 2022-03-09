// file to create a sanityClient
import sanityClient from "@sanity/client";

const options = {
  // configuration that has to be passed to sanityClient
  dataset: process.env.SANITY_DATASET_NAME,
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production", // false if in development.
  // useCdn === true, gives you fast response, but it will get you cached data
  // useCdn === false, gives you a bit slow response but latest one.
};

export const previewClient = sanityClient({
  ...options,
  useCDN: false,
  token: process.env.SANITY_API_TOKEN,
});
export default sanityClient(options);
