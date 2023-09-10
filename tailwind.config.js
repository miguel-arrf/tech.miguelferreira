module.exports = {
  darkMode: "class",
  theme: {
    extend: {}
  },
  variants: {
    textColor: [
      "responsive",
      "dark",
      "group-hover",
      "focus-within",
      "hover",
      "focus"
    ]
  },
  plugins: [require("tailwindcss-blend-mode")()]
};
