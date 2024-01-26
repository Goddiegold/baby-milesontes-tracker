/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'color-1': "#B483FF",
        'color-2': '#F9C784',
        'color-3': '#83D3C4',
        'color-4': '#FF6F61',
        'color-5': '#F9C784',
        'color-6': '#6E7D91',
        'color-7': '#F9D9C1',
        'color-8': '#717171',
        'color-9': '#B7A9A9',
        'color-10': '#DA9898FF',
        'color-11': '#0000007B',
        'color-12': '#f6f6f6',
        'color-13': '#6689DFFF',
        'color-14': 'rgba(159, 159, 159, 1)',
        'color-15':'rgba(196, 196, 196, 1)'
      },
      fontFamily: {
        'Henry-Penny': 'Henry-Penny',
        'Lexend': 'Lexend',
        'Poppins-Regular': 'Poppins-Regular',
        'Poppins-Medium': 'Poppins-Medium',
        'AbeeZee':'ABeeZee-Regular'
      }
    },
  },
  plugins: [],
}

