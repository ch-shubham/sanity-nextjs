import { Button, Col, Row } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro.";

import FilteringMenu from "components/FilteringMenu";
import { useState } from "react";
import { useGetBlogsPages } from "actions/pagination";
import { getPaginatedBlogs } from "lib/api";
import PreviewAlert from "components/PreviewAlert";

export default function Home({ blogs, preview }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
    date: { asc: 0 },
  });

  //  loadMore: to load more data
  //  isLoadingMore: is true whenever we are making request to fetch data
  //  isReachingEnd: is true when we loaded all of the data, data is empty(empty array)
  const { pages, isLoadingMore, isReachingEnd, loadMore } = useGetBlogsPages({
    blogs,
    filter,
  });

  return (
    <PageLayout>
      <Row>
        <Col md="8">
          {preview && <PreviewAlert />}
          <AuthorIntro />
        </Col>
      </Row>
      <FilteringMenu
        filter={filter}
        onChange={(option, value) => setFilter({ ...filter, [option]: value })}
      />
      <hr />
      <Row className="mb-5">{pages}</Row>
      <div style={{ textAlign: "center" }}>
        <Button
          size="lg"
          variant="outline-secondary"
          onClick={loadMore}
          disabled={isReachingEnd || isLoadingMore}
        >
          {isLoadingMore
            ? "..."
            : isReachingEnd
            ? "No More Blogs"
            : "More Blogs"}
        </Button>
      </div>
    </PageLayout>
  );
}

// function is called during the build (build time)
// Provides the props to your page and it creates the static pages.
export async function getStaticProps({ preview = false }) {
  const blogs = await getPaginatedBlogs({ offset: 0, date: "desc" });
  return {
    // return the prop object which is again a object havng the propNames and the values to it
    props: {
      blogs,
      preview,
    },
  };
}
