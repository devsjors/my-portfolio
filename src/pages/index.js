import { useRouter } from "next/router";
import { useRef } from "react";
import anime from "animejs";
import client from "@/utils/prismic-api";
import gql from "graphql-tag";
import Layout from "@/components/layout";
import Card from "@/components/card";
import Skill from "@/components/skill";
import convertPXToVW from "@/modules/convertPXToVW";

const Index = ({ data }) => {
    const router = useRouter();
    const cardsContainer = useRef(null);

    const {
        allArticles: { edges: articles },
        allSkills: { edges: skills },
    } = data;

    const seo = {
        seo_title: "Sjors Eveleens - Portfolio",
        seo_description: "Homepage",
    };

    const pageTransition = (event, uid) => {
        event.preventDefault();
        const el = event.currentTarget;
        const container = cardsContainer.current;
        const elementWidth = el.offsetWidth;
        const { top: elementTop, left: elementLeft } = el.getBoundingClientRect();
        const { top: containerTop, left: containerLeft } = container.getBoundingClientRect();
        const { paddingLeft, paddingTop } = getComputedStyle(el);
        el.style.position = "absolute";

        anime({
            targets: el,
            width: [convertPXToVW(elementWidth), "100vw"],
            height: "100vh",
            top: [elementTop, 0],
            left: [elementLeft, 0],
            paddingTop: [paddingTop, parseInt(paddingTop) + containerTop],
            paddingLeft: [paddingLeft, containerLeft],
            paddingRight: [paddingLeft, containerLeft],
            easing: "cubicBezier(0.25, 0.1, 0.25, 1)",
            duration: 800,
        }).finished.then(() => {
            el.classList.remove("animate");
            router.push(`/articles/${uid}`);
        });
    };

    return (
        <Layout seo={seo} data-slug="home">
            <section id="home" className="container__inner intro">
                <div ref={cardsContainer} className="cards">
                    {articles.map((article) => {
                        const {
                            node: {
                                _meta: { id, uid },
                                title,
                                intro_text,
                            },
                        } = article;

                        return (
                            <Card
                                onClick={(event) => pageTransition(event, uid)}
                                key={id}
                                title={title}
                                intro_text={intro_text}
                                uid={uid}
                            />
                        );
                    })}
                </div>
                <div className="skills">
                    {skills.map((skill) => {
                        const {
                            node: {
                                _meta: { id },
                                color,
                                icon,
                            },
                        } = skill;

                        return <Skill key={id} color={color} icon={icon} />;
                    })}
                </div>
            </section>
            <div id="about" className="container about">
                <section className="container__inner">About</section>
            </div>
            <section id="contact" className="container__inner contact">
                Contact
            </section>
            <section id="works" className="container__inner works">
                Works
            </section>
        </Layout>
    );
};

export default Index;

export async function getStaticProps() {
    const req = await client.query({
        query: gql`
            {
                homepage(uid: "homepage", lang: "nl-nl") {
                    title
                }
                allArticles {
                    edges {
                        node {
                            _meta {
                                id
                                uid
                            }
                            title
                            intro_text
                        }
                    }
                }
                allSkills(sortBy: position_ASC) {
                    edges {
                        node {
                            _meta {
                                id
                            }
                            color
                            icon
                        }
                    }
                }
            }
        `,
    });
    const { data } = await req;

    return {
        props: { data },
    };
}
