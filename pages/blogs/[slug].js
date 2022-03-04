import { Row, Col } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import { getBlogBySlug, getAllBlogs, urlFor } from "lib/api";
import BlogHeader from "components/BlogHeader";
import BlogContent from "components/BlogContent";
import moment from "moment";
const BlogDetail = ({ blog }) => {
  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
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

export async function getStaticProps({ params }) {
  const { slug } = params;
  const blog = await getBlogBySlug(slug);
  return {
    props: {
      blog,
    },
  };
}

//TODO: Introduce Fallback
export async function getStaticPaths() {
  const blogs = await getAllBlogs()
  const paths = blogs?.map((b) => ({ params: { slug: b.slug } }));
  return {
    paths,
    fallback: false,
  };
}

export default BlogDetail;
