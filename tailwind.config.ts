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
        "primary": "#ccd5da",
        "secondary": "#648496",
        "primary-forground": "#537484",
        "secondary-foreground": "#65808e"
      },
      blur: {
        sm: '6px',
      },
    },
  },
  plugins: [],
};
export default config;
