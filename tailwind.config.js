export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        apple: {
          blue: "#0066cc",
          blueFocus: "#0071e3",
          blueDark: "#2997ff",
          ink: "#1d1d1f",
          muted: "#7a7a7a",
          mutedDark: "#333333",
          hairline: "#e0e0e0",
          soft: "#f0f0f0",
          canvas: "#ffffff",
          parchment: "#f5f5f7",
          pearl: "#fafafc",
          tile: "#272729",
          tile2: "#2a2a2c",
          tile3: "#252527",
          black: "#000000",
        },
        forest: {
          50: "#f5f5f7",
          100: "#f0f0f0",
          500: "#0071e3",
          700: "#0066cc",
          900: "#1d1d1f",
        },
        harvest: {
          100: "#fafafc",
          400: "#cccccc",
          600: "#333333",
        },
        climate: {
          100: "#f5f5f7",
          500: "#2997ff",
          700: "#0066cc",
        },
      },
      boxShadow: {
        soft: "rgba(0, 0, 0, 0.22) 3px 5px 30px 0",
        panel: "none",
      },
    },
  },
  plugins: [],
}
