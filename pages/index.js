import { Col, Row } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro.";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";

import { getAllBlogs } from "lib/api";

export default function Home({ blogs, randomNumber }) {
  return (
    <PageLayout>
      <Row>
        <Col md="8">
          <AuthorIntro />
        </Col>
      </Row>
      <hr />
      <h1>{randomNumber}</h1>
      <Row className="mb-5">
        {/* <Col md="10">
          <CardListItem />
        </Col> */}
        {blogs.map((blog) => (
          <Col key={blog.slug} md="4">
            <CardItem title={blog.title} subtitle={blog.subtitle} />
          </Col>
        ))}
      </Row>
    </PageLayout>
  );
}

// function is called during the build (build time)
// Provides the props to your page and it creates the static pages.
// export async function getStaticProps() {
//   const randomNumber = Math.random();
//   const blogs = await getAllBlogs();
//   return {
//     // return the prop object which is again a object havng the propNames and the values to it
//     props: {
//       blogs,
//     },
//   };
// }

export async function getServerSideProps() {
  const randomNumber = Math.random();
  const blogs = await getAllBlogs();
  return {
    // return the prop object which is again a object havng the propNames and the values to it
    props: {
      blogs,
      randomNumber,
    },
  };
}

// Static Page
// Faster, can be cached by using CDN
// Created at build time
// When we making the request we are always receiving the sae html documemt.

// Dynamic Page
// Created at request time(we can fetch data on server)
// Little bit slower, the time depemds on the data you are fetching
