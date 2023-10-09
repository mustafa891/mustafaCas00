/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  important: true,
  theme: {
    extend: {
      colors: {
        "dark-green": {
          200: "#213743",
          300: "#2a4554",
          400: "#192934",
          500: "#1a2c38",
          600: "#1a2a36",
          700: "#172732",
          800: "#13242a", //Need to change
          900: "#0d191e",
        },
        "green-light": {
          //200: "#a8d67a",
          200: "#e6384a",
          300: "#68eeae",
          400: "#e6384a",
        },
        "roulette-green": {
          300: "rgb(51, 193, 108)",
        },
        "roulette-red": {
          300: "#ed4f5c",
        },
        "roulette-black": {
          300: "rgb(45, 66, 73)",
        },
        "blue-white": {
          200: "#dff5ff",
        },
      },
      fontFamily: {
        "Rubik-fade": ["'Rubik 80s Fade'", "'sans-serif'"],
        "Rubik-moon": ["'Rubik Moonrocks'", "'sans-serif'"],
        EarlyMan: ["'EarlyMan'", "'sans-serif'"],
        "Blogger-Sans": ["'Blogger-Sans'", "'sans-serif'"],
        "Blogger-Sans-Medium": ["'Blogger-Sans-Medium'", "'sans-serif'"],
        "Blogger-Sans-Light": ["'Blogger-Sans-Light'", "'sans-serif'"],
        "Blogger-Sans-Bold": ["'Blogger-Sans-Bold'", "'sans-serif'"],
      },
    },
  },
  plugins: [],
};
