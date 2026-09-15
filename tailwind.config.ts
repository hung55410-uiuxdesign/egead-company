import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sai: {
          teal: "#25E2CC",
          "teal-hover": "#1ec2af",
          mint: "#D3F9F5",
          "dark-teal": "#007380",
          black: "#0A0D0E",
          dark: "#101416",
          darker: "#060809",
          card: "#141718",
          gray: "#8C8C8C",
          "light-gray": "#F4F5F6",
          border: "#262C30",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "Montserrat", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        rubik: ["var(--font-montserrat)", "Montserrat", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
