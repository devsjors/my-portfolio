// import { useRouter } from "next/router";
import { useRef } from "react";
import anime from "animejs";
import client from "@/utils/prismic-api";
import gql from "graphql-tag";
import Layout from "@/components/layout";
import Card from "@/components/card";
import Skill from "@/components/skill";

const Index = ({ data }) => {
    // const router = useRouter();
    const cardsContainer = useRef(null);

    const {
        allArticles: { edges: articles },
        allSkills: { edges: skills },
    } = data;

    const seo = {
        seo_title: "Sjors Eveleens - Portfolio",
        seo_description: "Homepage",
    };

    const pageTransition = (event) => {
        event.preventDefault();
        const el = event.currentTarget;
        const container = cardsContainer.current;
        const elementFromLeft = el.getBoundingClientRect().left;
        const containerFromLeft = container.getBoundingClientRect().left;

        el.classList.add("animate-grow");
        container.querySelectorAll("a:not(.animate-grow)").forEach((child) => {
            child.style.position = "absolute";
            child.style.zIndex = "-1";
        });

        // const padding = (value) => {

        // }

        anime({
            targets: el,
            width: "100vw",
            easing: "linear",
            translateX: [
                elementFromLeft - containerFromLeft,
                -containerFromLeft,
            ],
            // padding: ,
            update: (animation) => {
                const spacing = (containerFromLeft / 100) * animation.progress;
                el.style.paddingRight = `${spacing}px`;
                if (spacing > 24) {
                    el.style.paddingLeft = `${spacing}px`;
                }
            },
            // easing: "cubicBezier(0.25, 0.1, 0.25, 1)",
            duration: 2000,
        }).finished.then(() => {
            console.log("finished");
            el.classList.remove("animate");
            // router.push(`/articles/${uid}`);
        });
    };

    return (
        <Layout seo={seo} className="homepage">
            <section id="home" className="container__inner homepage__intro">
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
