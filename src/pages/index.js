import Layout from "@/components/layout";
import Card from "@/components/card";

const Index = () => {
    const seo = {
        seo_title: "Sjors Eveleens - Portfolio",
        seo_description: "Homepage",
    };

    return (
        <Layout seo={seo} className="homepage">
            <section id="home" className="container__inner homepage__intro">
                <div className="cards">
                    {[0, 1, 2].map((_, i) => {
                        return <Card key={i} />;
                    })}
                </div>
            </section>
            <div id="about" className="container homepage__about">
                <section className="container__inner">About</section>
            </div>
            <section
                id="contact"
                className="container__inner homepage__contact"
            >
                Contact
            </section>
            <section id="works" className="container__inner homepage__works">
                Works
            </section>
        </Layout>
    );
};

export default Index;
