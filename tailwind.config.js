// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'aboutSriLanka-bg': "url('../src/assets/images/Home1.jpg')",
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
