import Link from "next/link";
import Button from "@/components/button";

const Header = () => {
    return (
        <header className="container menu__wrapper">
            <div className="container__inner menu__inner">
                <Link href="/">
                    <a>Logo</a>
                </Link>
                <nav className="menu__navigation">
                    <ul>
                        <li>
                            <Link href="/#home">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/#about">
                                <a>About</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/#contact">
                                <a>Contact</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/#works">
                                <a>Works</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Button href="/" className="menu__cta button button--yellow">
                    Call to action
                </Button>
            </div>
        </header>
    );
};

export default Header;
