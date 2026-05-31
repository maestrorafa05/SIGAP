export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#eff8f0",
          100: "#d9efdc",
          500: "#2f8f52",
          700: "#17623a",
          900: "#0d3d29",
        },
        harvest: {
          100: "#fff2bf",
          400: "#e4b52d",
          600: "#b98312",
        },
        climate: {
          100: "#dff4ff",
          500: "#2498d8",
          700: "#15699d",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(16, 50, 35, 0.10)",
        panel: "0 8px 28px rgba(29, 43, 35, 0.08)",
      },
    },
  },
  plugins: [],
}
