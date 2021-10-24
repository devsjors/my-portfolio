import anime from "animejs";
import { useEffect, useRef } from "react";
import gql from "graphql-tag";
import Layout from "@/components/layout";
import client from "@/utils/prismic-api";
import PrismicDom from "prismic-dom";

const Index = ({ article, animate }) => {
    const introHeader = useRef(null);

    const {
        _meta: { uid },
        title,
        intro_text,
    } = article;

    const seo = {
        seo_title: "Sjors Eveleens - Portfolio",
        seo_description: "Homepage",
    };

    const pageTransitionEnter = () => {
        const { current: container } = introHeader;

        anime({
            targets: container.children,
            opacity: [0, 1],
            translateY: [-12, 0],
            delay: anime.stagger(100),
        });
    };

    useEffect(() => {
        window.history.replaceState(null, "", `/articles/${uid}`);
        animate && pageTransitionEnter();
    }, [animate, uid]);

    return (
        <Layout seo={seo} data-slug="article-detail">
            <div className="container intro">
                <section ref={introHeader} className="container__inner">
                    <h3 className="heading heading--epic">{PrismicDom.RichText.asText(title)}</h3>
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
        query: { animate = false },
    } = context;

    const req = await client.query({
        query: gql`
            query Article($uid: String!) {
                article(uid: $uid, lang: "nl-nl") {
                    _meta {
                        uid
                    }
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
    } = req;

    return {
        props: { article, animate },
    };
}
