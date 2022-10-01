const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		colors: {
			primary: { 
				...colors.pink, 
				'1':  colors.pink[600],
				'2':  colors.pink[700],
				'3':  colors.pink[100],				
			},

			'primary-dark': { 
				...colors.gray,
				'1':  colors.gray[900],
				'2':  colors.black,
				'3':  colors.gray[800],
			},
			

			secondary: colors.gray,
			'secondary-dark': colors.pink,

			'color-text-dark': colors.pink[100],
			'color-text': colors.gray[900],

			background: colors.white,
			'background-dark': colors.slate[700],
			...colors,
		},
	},
	plugins: [],
}
