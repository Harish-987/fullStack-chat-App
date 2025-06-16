// tailwind.config.js
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [daisyui],
  daisyui: {
    // Make sure this is correctly configured.
    // 'true' means all default DaisyUI themes are enabled.
    // You could also explicitly list your THEMES array if you only want those.
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
    // The classPrefix is important.
    // If you use this, your theme application in App.jsx must be `className="theme-yourtheme"`
    // If you remove this, it must be `data-theme="yourtheme"`
    classPrefix: "theme-", // Keep this for now, as it aligns with your theme selection in SettingsPage
  },
};