import { Col } from "react-bootstrap";
import { useGetBlogs } from "actions";
import { useSWRPages } from "swr";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";

export const useGetBlogsPages = ({ blogs: initialData, filter }) => {
  return useSWRPages(
    "index-page",
    ({ offset, withSWR }) => {
      const { data: blogs } = withSWR(useGetBlogs(initialData));

      if (!blogs) {
        return "Loading!!!";
      }

      return blogs.map((blog) =>
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
      );
    },
    //  Here you will compute offset that will get passed into prev call function(function at 2nd params.)
    //  SWR: data you will get from 'withSWR' fn,
    //  index: number of current page
    (SWR, index) => {
      return 0;
    },
    []
  );
};
