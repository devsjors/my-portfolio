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
                            <Link href="#">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <a>About</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <a>Contact</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
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
