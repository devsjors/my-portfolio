import Link from "next/link";
import Button from "@/components/button";

const Header = () => {
    return (
        <header className="container__inner menu">
            <a className="menu__logo">Logo</a>
            <nav className="menu__navigation">
                <ul>
                    <li>
                        <Link href="#home">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="#about">
                            <a>About</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="#contact">
                            <a>Contact</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="#works">
                            <a>Works</a>
                        </Link>
                    </li>
                </ul>
            </nav>
            <Button href="/" className="menu__cta button button--yellow">
                Call to action
            </Button>
        </header>
    );
};

export default Header;
