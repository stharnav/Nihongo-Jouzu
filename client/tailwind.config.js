/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        duolingo: {
          green: '#58CC02',
          'green-hover': '#46A302',
          'green-dark': '#3B8200',
          blue: '#1CB0F6',
          'blue-hover': '#1899D6',
          red: '#FF4B4B',
          orange: '#FF9600',
          'orange-hover': '#E08500',
          yellow: '#FFC800',
          gray: '#F0F0F0',
          'gray-dark': '#E5E5E5',
          'text-primary': '#1F1F1F',
          'text-secondary': '#777777',
          'text-muted': '#AFABAB',
          background: '#FAFAFA',
          card: '#FFFFFF',
          'card-border': '#E5E5E5',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      animation: {
        'bounce-in': 'bounceIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
      },
    },
  },
  plugins: [],
}
