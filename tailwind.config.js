module.exports = {
  darkMode: 'class',
  content: ['./src/app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      extend: {
        colors: {
          background: "var(--background)",
          foreground: "var(--foreground)",
          subBackground: "var(--subBackground)",
          accent: "var(--accent)",
          "accent-hover": "var(--accent-hover)",
        },
        fontFamily: {
          sans: ["Arial", "Helvetica", "sans-serif"],
        },
      },
    },
  },
  plugins: [],
};
