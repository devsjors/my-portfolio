import Theme from "@/theme";
import { useEffect, useRef } from "react";
import anime from "animejs";

const Shape = () => {
	const shape = useRef();

	useEffect(() => {
		const { blur } = Theme;
		anime({
			targets: shape.current,
			duration: 300,
			easing: "easeInOutExpo",
			update: (animation) => {
				shape.current.style.filter = `blur(${
					(animation.progress / 100) * parseInt(blur["3xl"], 10)
				}px)`;
			},
		});
	}, []);

	return (
		<>
			<span
				ref={shape}
				className="block rounded-full w-60 h-60 bg-primary-orange"
			/>
		</>
	);
};

export default Shape;
