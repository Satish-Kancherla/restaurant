/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // 4CAF50, D84315, 1E3A5F, 2E3B4E ,C62828, 455A64, 616161
        'theme-1':'#1E3A5F',
        'theme-2':'#B6EA5F',
        'theme-3':'#DADADA',
        'theme-success':'#16A34A',
        'theme-danger':'#b91c1c',
        'theme-text':'#282828',
      },
      fontSize: {
        '2xs': '0.625rem',
      }
    },
    screens: {
			'2xl': { max: "1536px" },
			// => @media (max-width: 1536px) { ... }

			xl: { max: "1279px" },
			// => @media (max-width: 1279px) { ... }

			lg: { max: "1023px" },
			// => @media (max-width: 1023px) { ... }

			md: { max: "767px" },
			// => @media (max-width: 767px) { ... }

			sm: { max: "639px" },
			// => @media (max-width: 639px) { ... }
      
			xs: { max: "474px" },
			// => @media (max-width: 474px) { ... }
		},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

