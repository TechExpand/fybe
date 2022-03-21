// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }



module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': 'Poppins'
      }
    },
    // colors: {
      // 'bookmark-grey': '#F7F5F5',
      // 'bookmark-red': '#FA5959',
      // 'bookmark-blue': '#242A45',
      // 'bookmark-grey': '#9194A2',
      // 'bookmarkwhite': '#f7f7f7',
    // },
    fontFamily: {
      Poppins: ["Poppins, sans-serif" ]
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        'lg': '1124px',


        // => @media (min-width: 1124px) { ... }
  
        'xl': '1124px',
        // => @media (min-width: 1124px) { ... }
  
        '2xl': '1124px',
        // => @media (min-width: 1124px) { ... }
      }
    }
  },
  plugins: [],
}
