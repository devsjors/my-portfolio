import { useRouter } from "next/router";
import { useRef } from "react";
import anime from "animejs";
import client from "@/utils/prismic-api";
import gql from "graphql-tag";
import Layout from "@/components/layout";
import Card from "@/components/card";
import Skill from "@/components/skill";

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
        const { current: container } = cardsContainer;
        const el = event.currentTarget;
        const clonedEl = el.cloneNode(true);
        container.appendChild(clonedEl);

        const { width, height, paddingTop, paddingLeft } = getComputedStyle(el);
        const { top: elementTop, left: elementLeft } = el.getBoundingClientRect();
        const { top: containerTop, left: containerLeft } = container.getBoundingClientRect();

        Object.assign(clonedEl.style, {
            width: width,
            height: height,
            position: "absolute",
            top: `${elementTop}px`,
            left: `${elementLeft}px`,
            zIndex: 100,
        });

        anime
            .timeline({
                targets: clonedEl,
                easing: "linear",
                duration: 800,
                complete: () => router.push(`/articles/${uid}`),
            })
            .add({
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                paddingTop: [paddingTop, parseInt(paddingTop) + containerTop],
                paddingLeft: [paddingLeft, containerLeft],
                paddingRight: [paddingLeft, containerLeft],
                borderRadius: 0,
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
