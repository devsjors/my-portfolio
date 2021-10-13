import PrismicDom from "prismic-dom";
import Link from "next/link";

const Card = ({ title, intro_text, uid, ...props }) => {
    return (
        <Link href={`/articles/${uid}`}>
            <a className="card" {...props}>
                <h3 className="card__title">
                    {PrismicDom.RichText.asText(title)}
                </h3>
                <p className="card__excerpt">
                    {PrismicDom.RichText.asText(intro_text)}
                </p>
            </a>
        </Link>
    );
};

export default Card;
