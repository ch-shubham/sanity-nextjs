import { Col } from "react-bootstrap";
import { useGetBlogs } from "actions";
import { useSWRPages } from "swr";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";
import { useEffect } from "react";
import CardItemBlank from "components/CarItemBlank";
import CardListItemBlank from "components/CardListItemBlank";
import moment from "moment";
export const useGetBlogsPages = ({ blogs, filter }) => {
  useEffect(() => {
    window.__pagination__init = true; // adding property to window for initial fetching
  }, []);

  return useSWRPages(
    "index-page",
    ({ offset, withSWR }) => {
      let initialData = !offset && blogs;

      if (typeof window !== "undefined" && window.__pagination__init) {
        initialData = null;
      }

      const { data: paginatedBlogs } = withSWR(
        useGetBlogs({ offset, filter }, initialData)
      ); // TODO: initialData must also be present.

      if (!paginatedBlogs) {
        return Array(3)
          .fill(0)
          .map((_, index) =>
            filter.view.list ? (
              <Col key={index} md="9">
                <CardListItemBlank />
              </Col>
            ) : (
              <Col key={`${index}-item`} md="4">
                <CardItemBlank />
              </Col>
            )
          );
      }

      return paginatedBlogs.map((blog) =>
        filter.view.list ? (
          <Col key={`${blog.slug}-list`} md="9">
            <CardListItem
              author={blog.author}
              title={blog.title}
              subtitle={blog.subtitle}
              date={moment(blog.date).format("LLL")}
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
              date={moment(blog.date).format("LLL")}
              image={blog.coverImage}
              slug={blog.slug}
              link={{ href: "/blogs/[slug]", as: `/blogs/${blog.slug}` }}
            />
          </Col>
        )
      );
    },
    //  Here you will compute offset that will get passed into prev call function(function at 2nd params.)
    //  SWR: data you will get from 'withSWR' fn,
    //  index: number of current page
    (SWR, index) => {
      // SWR is the data we getting in previous response from above function.
      if (SWR.data && SWR.data.length === 0) return null;
      return (index + 1) * 6;
    },
    [filter]
  );
};
