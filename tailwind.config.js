/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "#F3EEE6",
        surface: "#E7DFD2",
        ink: "#1C1916",
        mute: "#4F4942",
        accent: "#FF4D1C",
        "accent-hover": "#F24618",
        graphite: "#241F1B",
        foam: "#D9D0C3",
        tide: "#3E6D88",
      },
      fontFamily: {
        display: ["Cabinet Grotesk", "Satoshi", "system-ui", "sans-serif"],
        sans: ["Satoshi", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      maxWidth: {
        page: "1200px",
      },
      borderRadius: {
        btn: "6px",
      },
    },
  },
  plugins: [],
};
