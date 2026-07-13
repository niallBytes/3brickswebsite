/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        cream: '#F8F5F0',
        cream2: '#EFE9DF',
        brand: {
          DEFAULT: '#F47B20',
          orange: '#F47B20',
          orangeDark: '#D9631A',
          charcoal: '#1E1E1E',
          ink: '#141414',
          cream: '#F8F5F0'
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'marquee': { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.8)', opacity: '0' }
        },
        'bounce-slow': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' }
        }
      },
      animation: {
        'marquee': 'marquee 32s linear infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'bounce-slow': 'bounce-slow 2.2s ease-in-out infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
