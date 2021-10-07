import { useEffect, useRef } from "react";
import anime from "animejs";

const Shape = () => {
    const shape = useRef();

    useEffect(() => {
        anime({
            targets: shape.current,
            duration: 100,
            easing: "easeInOutExpo",
            update: (animation) => {
                shape.current.style.filter = `blur(${
                    (animation.progress / 100) * 64
                }px)`;
            },
        });
    }, []);

    return <span ref={shape} className="shape" />;
};

export default Shape;
