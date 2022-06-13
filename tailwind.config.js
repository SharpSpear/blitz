// tailwind.config.js
module.exports = {
  mode: "jit",
  purge: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        404: "url('/Error404.png')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      },
      backgroundSize: {
        50: "60%",
        16: "4rem",
      },
      colors: {
        button: {
          DEFAULT: "rgba(50, 87, 251, 1)",
          hover: "rgba(59, 85, 201, 1)",
          disabled: "rgba(201, 214, 247, 1)",
        },
        input: {
          DEFAULT: "rgba(241, 246, 255, 0.7)",
          disabled: "rgba(241, 246, 255, 0.7)",
        },
        primary: "rgba(241, 246, 255, 0.7)",
        secondary: "#ecc94b",
        active: "#F1F6FF",
        active2: "#D6DEF3",
        background: "8FBBFD",
        "horizontal-dots": "#898796",
      },
      spacing: {
        "box-height": "218px",
        "box-width": "270px",
        100: "100px",
      },
      fontSize: {
        100: ["100px", { lineHeight: "170%" }],
      },
      maxWidth: (theme, { breakpoints }) => ({
        80: "80vw",
        20: "20vw",
      }),
    },
    fontFamily: {
      Raleway: ["Raleway"],
      Montserrat: ["Montserrat", "serif"],
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {
      textDecoration: ["focus-visible"],
      border: ["focus"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
