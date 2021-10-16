import PageLayout from "components/PageLayout";
import { getBlogBySlug } from "lib/api";

const BlogDetail = ({ blog }) => {
  return (
    <PageLayout>
      <h1>Hello Details Page - {blog?.slug}</h1>
    </PageLayout>
  );
};

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const blog = await getBlogBySlug(slug);
  return {
    props: {
      blog,
    },
  };
}

export default BlogDetail;
