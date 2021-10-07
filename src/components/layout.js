import SEO from "@/components/seo";
import Header from "@/components/header";
import Footer from "@/components/footer";

const Layout = ({ children, seo, ...props }) => {
    const { seo_title, seo_description } = seo;

    return (
        <>
            <SEO seo_title={seo_title} seo_description={seo_description} />
            <Header />
            <main {...props}>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
