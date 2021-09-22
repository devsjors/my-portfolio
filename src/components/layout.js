import SEO from "@/components/seo";
import Header from "@/components/header";
import Footer from "@/components/footer";

const Layout = ({ children, seo }) => {
  const { seo_title, seo_description } = seo;

  return (
    <>
      <SEO seo_title={seo_title} seo_description={seo_description} />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
