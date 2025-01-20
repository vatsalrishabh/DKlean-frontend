const withMT = require("@material-tailwind/react/utils/withMT");
const flowbite = require("flowbite-react/tailwind");
 
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/flowbite/**/*.js",
      flowbite.content(),
  ],
 

  theme: {
    extend: {
      colors: {
        'custom-maroon0': '#e01212', // Custom color name and value
        'custom-maroon': '#8f1b1b',
        'custom-maroon2': '#6d0101',
        'custom-gray0': '#999',
        'custom-graybg':'#edeeee',
        'cutom-green':'#71a113',
      },
      animation: {
        "fade-in-down": "fadeInDown 0.8s ease-out",
        "fade-in-up": "fadeInUp 0.8s ease-out",
      },
      keyframes: {
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionProperty: {
        transform: "transform",
      },
      opacity: {
        0: "0",
        100: "1",
      },
    },
  },
  plugins:  [
    require('flowbite/plugin'),
    flowbite.plugin(),
],
});