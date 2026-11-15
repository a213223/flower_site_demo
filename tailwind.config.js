/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        botanika: {
          bg: '#F9F8F6',        // теплый молочный / алебастровый
          card: '#F0EDE8',      // мягкий бежево-серый
          text: '#1C1B1A',      // глубокий графит
          muted: '#68645E',     // приглушенный теплый серый
          subtle: '#8C877E',    // светлый подзаголовочный
          border: '#E2DDD5',    // тонкая разделительная линия 1px
          borderDark: '#D4CDBD',
          olive: '#2E3D32',     // приглушенный оливково-хвойный акцент
          oliveLight: '#3D5243',
          oliveDeep: '#1E2921',
          terracotta: '#B85D43', // терракотовый для статусов и уведомлений
          terracottaHover: '#A24E36',
          sand: '#ECE8E1',
          cream: '#FFFDF9'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widestEditorial: '0.18em',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(28, 27, 26, 0.04), 0 1px 2px -1px rgba(28, 27, 26, 0.04)',
        'drawer': '-4px 0 24px -4px rgba(28, 27, 26, 0.08)',
        'modal': '0 20px 40px -15px rgba(28, 27, 26, 0.12)',
      }
    },
  },
  plugins: [],
}
