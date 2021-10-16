import { Container } from "react-bootstrap";
import Footer from "./Footer";
import BlogNavbar from "./Navbar";
import Head from "next/head";

export default function PageLayout({ children, className }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container>
        <BlogNavbar />
        <div className={`page-wrapper ${className}`}>{children}</div>
        <Footer />
      </Container>
    </>
  );
}
