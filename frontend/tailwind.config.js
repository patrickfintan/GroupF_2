/** @type {import('tailwindcss').Config} */
export default {
  //7.1) note: in below code content: is empty by default
  //we copied and pasted content from: https://tailwindcss.com/docs/guides/vite
  //as seen here: https://www.youtube.com/watch?v=idvIjV85bUk&list=PLUX0Gmrifrwd7LmPYApia9NNwxV9-4Kgn&index=12
  //from the same page copy index.css and head to index.css for 7.2
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [],
}

