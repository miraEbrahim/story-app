/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Roboto", "sans-serif"],
            serif: ["Roboto Slab", "serif"],
            body: ["Roboto", "sans-serif"],
        },
        extend: {
            width: {
                128: "28rem",
            },
            colors: {
                blue: {
                    600: "#0072ff",
                    700: "#0d47a1",
                    100: "#2196f333",
                },
                gray: {
                    500: "#707E8A",
                    600: "#031528",
                    200: "#F0F2F5",
                    300: "#CCD6DF",
                },
            },
        },
    },
    plugins: [],
});
