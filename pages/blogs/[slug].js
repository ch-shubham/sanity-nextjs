import { Row, Col } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import { getBlogBySlug, getAllBlogs, urlFor, getPaginatedBlogs } from "lib/api";
import BlogHeader from "components/BlogHeader";
import BlogContent from "components/BlogContent";
import moment from "moment";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import PreviewAlert from "components/PreviewAlert";
const BlogDetail = ({ blog, preview }) => {
  const router = useRouter();

  if (!router.isFallback && !blog?.slug) {
    <ErrorPage />;
  }

  if (router.isFallback) {
    return <PageLayout className="blog-detail-page">Loading...</PageLayout>;
  }

  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          {preview && <PreviewAlert />}
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            author={blog.author}
            coverImage={
              blog.coverImage && urlFor(blog?.coverImage).height(600).url()
            }
            date={moment(blog.date).format("LLL")}
          />
          <hr />
          {/* Blog Content Here */}
          {blog.content && <BlogContent content={blog.content} />}
        </Col>
      </Row>
    </PageLayout>
  );
};

// preview comes from res.setPreviewData and previewData comes from the json we send inside the setPreviewData({...})

export async function getStaticProps({ params, preview = false, previewData }) {
  const { slug } = params;
  const blog = await getBlogBySlug(slug, preview);
  return {
    props: {
      blog,
      preview,
    },
  };
}

//TODO: Introduce Fallback
export async function getStaticPaths() {
  const blogs = await getPaginatedBlogs();
  const paths = blogs?.map((b) => ({ params: { slug: b.slug } }));
  return {
    paths,
    fallback: true,
  };
}

export default BlogDetail;
