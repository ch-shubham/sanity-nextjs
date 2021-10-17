import { Col, Row } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro.";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";

import { getAllBlogs } from "lib/api";
import FilteringMenu from "components/FilteringMenu";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home({ blogs }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
  });

  const { data, error } = useSWR("api/hello", fetcher);

  return (
    <PageLayout>
      <Row>
        <Col md="8">
          <AuthorIntro />
        </Col>
      </Row>
      <FilteringMenu
        filter={filter}
        onChange={(option, value) => setFilter({ ...filter, [option]: value })}
      />
      <hr />
      <Row className="mb-5">
        {/* <Col md="10">
          <CardListItem />
        </Col> */}
        {blogs.map((blog) =>
          filter.view.list ? (
            <Col key={`${blog.slug}-list`} md="9">
              <CardListItem
                author={blog.author}
                title={blog.title}
                subtitle={blog.subtitle}
                date={blog.date}
                slug={blog.slug}
                link={{ href: "/blogs/[slug]", as: `/blogs/${blog.slug}` }}
              />
            </Col>
          ) : (
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
          )
        )}
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
