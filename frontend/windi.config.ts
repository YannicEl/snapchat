import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
	theme: {
		container: {
			center: true,
		},
		fontFamily: {
			sans: ['Montserrat', 'sans-serif'],
		},
	},
  safelist: [
    "w-10",
    "w-5",
    "h-10",
    "h-5",
  ]
});
