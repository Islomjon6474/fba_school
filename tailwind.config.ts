/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      // => @media (min-width: 320px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      transitionProperty: {
        bg: "background-color, background-image",
      },
      colors: {
        blur: "rgba(255, 255, 255, 0.08)",
        primary: "#0D1117",
        secondary: "#161B22",
        dark: "#292929",
        lightblue: "#019EF9",
        "one-dark": "#30363D",
        "half-pink": "#939AFF",
        btncolor: "#3F9CFB",
        grayColor: "#1F1D29",
        grayBlur: "rgba(255, 255, 255, 0.08)",
        grayBorder: "rgba(255, 255, 255, 0.10)",
        features_bg_grad_via: "rgba(22, 27, 34, 0.53)",
        features_bg_grad_to: "rgba(22, 27, 34, 0.46)",
        features_icons_color:
          "linear-gradient(180deg, #8324ff98 0%, #5D2ABF 100%)",
        pink_gradient: "linear-gradient(45deg, #3F9CFB -10%, #B856F3 139%)",
      },
      backgroundImage: {
        main: "linear-gradient(91.97deg, #00C7FE -34.54%, #007BF4 34.16%, #8D53FD 97.37%)",
        auth: "linear-gradient(159.21deg, #241D38 13.76%, #110E1B 100.03%)",
        "pink-blur": "linear-gradient(180deg, #8324ff98 0%, #5D2ABF 100%)",
        gradient:
          "background: linear-gradient(106.03deg, #1085F5 -9.61%, #0C6AF2 16.15%, #2D53F4 43.3%, #5C3EF9 77.41%, rgba(197, 84, 223, 0.42) 121.58%)",
        "black-white":
          "background: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 100%);",
        "blue-gradient":
          "linear-gradient(159deg, #3F9CFB 0%, rgba(27, 137, 250, 0.65) 0%, #007EFF 56.99%, rgba(78, 165, 255, 0.59) 98.43%)",
        "gradient-black-header": "linear-gradient(to bottom, black, white)",
        "pink-gradient": "linear-gradient(45deg, #3F9CFB -10%, #B856F3 139%)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-fira-code)"],
        inter: ["Inter", "sans-serif"],
      },
      dropShadow: {
        lightblue: "0 0 8px #019EF9",
        lightblue50: "0 0 4px #2596BE",
        pink: "linear-gradient(45deg, #3F9CFB -10%, #B856F3 139%)",
      },
      keyframes: {
        enterFromRight: {
          from: { opacity: 0, transform: "translateX(200px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        enterFromLeft: {
          from: { opacity: 0, transform: "translateX(-200px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        exitToRight: {
          from: { opacity: 1, transform: "translateX(0)" },
          to: { opacity: 0, transform: "translateX(200px)" },
        },
        exitToLeft: {
          from: { opacity: 1, transform: "translateX(0)" },
          to: { opacity: 0, transform: "translateX(-200px)" },
        },
        scaleIn: {
          from: { opacity: 0, transform: "rotateX(-10deg) scale(0.9)" },
          to: { opacity: 1, transform: "rotateX(0deg) scale(1)" },
        },
        scaleOut: {
          from: { opacity: 1, transform: "rotateX(0deg) scale(1)" },
          to: { opacity: 0, transform: "rotateX(-10deg) scale(0.95)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
      },
      fontSize: {
        heading: "52px",
        headingMd: "48px",
        headingSm: "32px",
        headingLg: "36px",
        extraSmall: "14px",
        small: "16px",
      },
      lineHeight: {
        heading: "52px",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        xl: "30px",
      },
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    animation: {
      scaleIn: "scaleIn 200ms ease",
      scaleOut: "scaleOut 200ms ease",
      fadeIn: "fadeIn 200ms ease",
      fadeOut: "fadeOut 200ms ease",
      enterFromLeft: "enterFromLeft 250ms ease",
      enterFromRight: "enterFromRight 250ms ease",
      exitToLeft: "exitToLeft 250ms ease",
      exitToRight: "exitToRight 250ms ease",
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    // function ({ addUtilities }) {
    //   const newUtilities = {
    //     ".text-gradient": {
    //       background: "linear-gradient(45deg, #3F9CFB -10%, #B856F3 139%)",
    //       "-webkit-background-clip": "text",
    //       "background-clip": "text",
    //       color: "transparent",
    //     },
    //   };
    //   addUtilities(newUtilities, ["responsive", "hover"]);
    // },
  ],
};
