import gql from "graphql-tag";
import Layout from "@/components/layout";
import client from "@/utils/prismic-api";
import PrismicDom from "prismic-dom";

const Index = ({ article }) => {
    const { title, intro_text } = article;

    const seo = {
        seo_title: "Sjors Eveleens - Portfolio",
        seo_description: "Homepage",
    };

    return (
        <Layout seo={seo} className="articlesDetail">
            <div className="container articlesDetail__intro">
                <section className="container__inner">
                    <h3>{PrismicDom.RichText.asText(title)}</h3>
                    <p>{PrismicDom.RichText.asText(intro_text)}</p>
                </section>
            </div>
        </Layout>
    );
};

export default Index;

export async function getServerSideProps(context) {
    const {
        params: { id },
    } = context;

    const req = await client.query({
        query: gql`
            query Article($uid: String!) {
                article(uid: $uid, lang: "nl-nl") {
                    title
                    intro_text
                }
            }
        `,
        variables: {
            uid: id,
        },
    });

    const {
        data: { article },
    } = await req;

    return {
        props: { article },
    };
}
