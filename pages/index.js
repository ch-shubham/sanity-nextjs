import { Col, Row } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro.";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";

export default function Home() {
  return (
    <PageLayout>
      <Row>
        <Col md="8">
          <AuthorIntro />
        </Col>
      </Row>
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
