import PageLayout from "components/PageLayout";
import { getBlogBySlug, getAllBlogs } from "lib/api";

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

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const paths = blogs?.map((b) => ({ params: { slug: b.slug } }));
  return {
    paths,
    fallback: false,
  };
}

export default BlogDetail;
