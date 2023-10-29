// tailwind.config.js
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				purple: {
					600: "hsl(259, 100%, 65%)",
				},
				red: {
					200: "hsl(0, 100%, 67%)",
				},
				white: "hsl(0, 0%, 100%)",
				gray: {
					100: "hsl(0, 0%, 94%)",
					300: "hsl(0, 0%, 86%)",
					700: "hsl(0, 1%, 44%)",
					900: "hsl(0, 0%, 8%)",
				},
			},
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
		},
	},
	variants: {},
	plugins: [],
};
