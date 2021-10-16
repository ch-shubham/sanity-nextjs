import PageLayout from "components/PageLayout";
import { getBlogBySlug } from "lib/api";

const BlogDetail = ({ blog }) => {
  return (
    <PageLayout>
      <h1>Hello Details Page - {blog?.slug}</h1>
    </PageLayout>
  );
};

export async function getStaticProps({ params }) {
  const { slug } = params;
  const blog = await getBlogBySlug(slug);
  return {
    props: {
      blog,
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: "my-first-blog",
        },
      },
      {
        params: {
          slug: "my-second-blog",
        },
      },
      {
        params: {
          slug: "my-third-blog",
        },
      },
    ],
    fallback: false,
  };
}

export default BlogDetail;
