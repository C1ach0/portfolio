import type { Config } from 'tailwindcss'

export default <Config>{
  theme: {
    extend: {
      colors: {
        surface: {
          50: '#FFFFFF',  // Blanc pur
          100: '#F2F2F2', // Gris très clair
          200: '#D9D9D9', // Gris clair
          300: '#BFBFBF', // Gris moyen clair
          400: '#A6A6A6', // Gris moyen
          500: '#8C8C8C', // Gris neutre
          600: '#737373', // Gris un peu foncé
          700: '#595959', // Gris foncé
          800: '#404040', // Gris très foncé
          900: '#262626', // Noir presque pur
          950: '#000000'  // Noir pur
        }
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}