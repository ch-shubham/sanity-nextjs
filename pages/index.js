import { Col, Row } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro.";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";

import { getAllBlogs } from "lib/api";

export default function Home({ blogs }) {
  return (
    <PageLayout>
      <Row>
        <Col md="8">
          <AuthorIntro />
        </Col>
      </Row>
      <hr />
      <Row className="mb-5">
        {/* <Col md="10">
          <CardListItem />
        </Col> */}
        {blogs.map((blog) => (
          <Col key={blog.slug} md="4">
            <CardItem
              author={blog.author}
              title={blog.title}
              subtitle={blog.subtitle}
              date={blog.date}
              image={blog.coverImage}
              slug={blog.slug}
              link={{ href: "/blogs/[slug]", as: `/blogs/${blog.slug}` }}
            />
          </Col>
        ))}
      </Row>
    </PageLayout>
  );
}

// function is called during the build (build time)
// Provides the props to your page and it creates the static pages.
export async function getStaticProps() {
  const blogs = await getAllBlogs();
  return {
    // return the prop object which is again a object havng the propNames and the values to it
    props: {
      blogs,
    },
  };
}
