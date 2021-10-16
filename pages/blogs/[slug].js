import { Row, Col } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import { getBlogBySlug, getAllBlogs } from "lib/api";

const BlogDetail = ({ blog }) => {
  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <div className="blog-detail-header">
            <p className="lead mb-0">
              <img
                src={blog.author?.avatar}
                className="rounded-circle mr-3"
                height="50px"
                width="50px"
                alt="avatar"
              />
              {blog.author?.name}
              {", "} {blog.author?.data}
            </p>
            <h1 className="font-weight-bold blog-detail-header-title mb-0">
              {blog.title}
            </h1>
            <h2 className="blog-detail-header-subtitle mb-3">
              {blog.subtitle}
            </h2>
            {/* Check if contains cover image */}
            <img className="img-fluid rounded" src={blog.coverImage} alt="" />
          </div>
          <hr />
          {/* Blog Content Here */}
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
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

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const paths = blogs?.map((b) => ({ params: { slug: b.slug } }));
  return {
    paths,
    fallback: false,
  };
}

export default BlogDetail;
