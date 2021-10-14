import { Col, Row } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro.";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";

export default function Home(props) {
  return (
    <PageLayout>
      <Row>
        <Col md="8">
          <AuthorIntro />
        </Col>
      </Row>
      {props.message}
      <hr />
      <Row className="mb-5">
        <Col md="10">
          <CardListItem />
        </Col>
        <Col md="4">
          <CardItem />
        </Col>
      </Row>
    </PageLayout>
  );
}

// function is called during the build (build time)
// Provides the props to your page and it creates the static pages.
export async function getStaticProps() {
  return {
    // return the prop object which is again a object havng the propNames and the values to it
    props: {
      message: "Hello",
    },
  };
}
