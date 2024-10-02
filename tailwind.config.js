/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     
        colors: {
          customGray: '#474749',
          customGold: '#cf9b48',
          
        },
        backgroundImage: {
          'custom-gradient': 'linear-gradient(to right, #fed267 0%, #cf9b48 100%)',
        },
        
    
    },
  },
  plugins: [],
}

