import Link from "next/link";

const Button = ({ className, children, ...props }) => {
    return (
        <>
            <Link {...props}>
                <a className={className}>{children}</a>
            </Link>
        </>
    );
};

export default Button;
