import { Col, Row } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro.";

import FilteringMenu from "components/FilteringMenu";
import { useState } from "react";
import { useGetBlogsPages } from "actions/pagination";
import { getAllBlogs } from "lib/api";

export default function Home({ blogs }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
  });

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useGetBlogsPages({
    blogs,
    filter,
  });

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
      <Row className="mb-5">{pages}</Row>
    </PageLayout>
  );
}

// function is called during the build (build time)
// Provides the props to your page and it creates the static pages.
export async function getStaticProps() {
  const blogs = await getAllBlogs({ offset: 0 });
  return {
    // return the prop object which is again a object havng the propNames and the values to it
    props: {
      blogs,
    },
  };
}
