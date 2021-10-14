import { Container } from "react-bootstrap";
import Footer from "./Footer";
import BlogNavbar from "./Navbar";

export default function PageLayout({ children, className }) {
  return (
    <Container>
      <BlogNavbar />
      <div className={`page-wrapper ${className}`}>{children}</div>
      <Footer />
    </Container>
  );
}
