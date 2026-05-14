/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{hbs,html,js}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#212121",
        nearBlack: "#17171c",
        deepGreen: "#003c33",
        darkNavy: "#071829",
        actionBlue: "#1863dc",
        coral: "#ff7759",
        softCoral: "#ffad9b",
        canvasWhite: "#ffffff",
        softStone: "#eeece7",
        paleGreen: "#edfce9",
        paleBlue: "#f1f5ff",
        mutedSlate: "#70707d",
        slate: "#737382",
        hairline: "#d9d9dd",
        borderLight: "#e5e7eb"
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui"],
        body: ["Inter", "Arial", "ui-sans-serif", "system-ui"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "22px",
        xl: "30px",
        pill: "9999px"
      }
    },
  },
  plugins: [],
}
