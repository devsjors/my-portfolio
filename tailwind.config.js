const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	mode: "jit",
	purge: ["./src/**/*.js"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				primary: {
					red: "#FF416C",
					orange: "#FF4B2B",
				},
				base: {
					black: "#111111",
				},
			},
			fontFamily: {
				display: ["Inter", ...defaultTheme.fontFamily.sans],
				body: ["Inter", ...defaultTheme.fontFamily.sans],
			},
			zIndex: {
				"-1": "-1",
			},
		},
		container: {
			center: true,
			padding: {
				DEFAULT: "1rem",
				sm: "2rem",
				lg: "4rem",
				xl: "5rem",
				"2xl": "6rem",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
