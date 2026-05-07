import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          light: 'hsl(var(--primary-light))',
          dark: 'hsl(var(--primary-dark))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': { from: { height: '0', opacity: '0' }, to: { height: 'var(--radix-accordion-content-height)', opacity: '1' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)', opacity: '1' }, to: { height: '0', opacity: '0' } },
        'fade-in': { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-out': { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
        'scale-in': { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        'slide-in-right': { '0%': { transform: 'translateX(-100%)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
        'slide-in-up': { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        'shimmer': { '0%': { backgroundPosition: '-1000px 0' }, '100%': { backgroundPosition: '1000px 0' } },
        'float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        'pulse-glow': { '0%,100%': { boxShadow: '0 0 0 0 hsl(var(--primary) / 0.4)' }, '50%': { boxShadow: '0 0 0 10px hsl(var(--primary) / 0)' } },
        'loop-rotate': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        'loop-float-sm': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
        'loop-float-md': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        'loop-float-lg': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        'loop-pulse-subtle': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
        'loop-pulse-glow': { '0%,100%': { boxShadow: '0 0 0 0 hsl(var(--primary) / 0.3)' }, '50%': { boxShadow: '0 0 0 12px hsl(var(--primary) / 0)' } },
        'loop-bounce': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'loop-wobble': { 
          '0%,100%': { transform: 'translateX(0) rotate(0deg)' }, 
          '15%': { transform: 'translateX(-10px) rotate(-3deg)' }, 
          '30%': { transform: 'translateX(8px) rotate(3deg)' }, 
          '45%': { transform: 'translateX(-6px) rotate(-2deg)' }, 
          '60%': { transform: 'translateX(4px) rotate(1deg)' }, 
          '75%': { transform: 'translateX(-2px) rotate(-1deg)' }
        },
        'loop-swing': { 
          '0%,100%': { transform: 'rotate(0deg)' }, 
          '25%': { transform: 'rotate(5deg)' }, 
          '75%': { transform: 'rotate(-5deg)' }
        },
        'loop-spin-slow': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        'marquee-horiz': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'marquee-horiz-reverse': { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
        'marquee-vert': { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(-50%)' } },
        'fade-in-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in-down': { '0%': { opacity: '0', transform: 'translateY(-20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in-left': { '0%': { opacity: '0', transform: 'translateX(20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        'fade-in-right': { '0%': { opacity: '0', transform: 'translateX(-20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
'zoom-in': { '0%': { opacity: '0', transform: 'scale(0.9)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        'slide-up': { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'slide-down': { '0%': { opacity: '0', transform: 'translateY(-30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'world-invert': { '0%, 100%': { opacity: '0.3', filter: 'invert(0)' }, '50%': { opacity: '1', filter: 'invert(1)' } }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'scale-in': 'scale-in 0.25s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-up': 'slide-in-up 0.4s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'enter': 'fade-in 0.4s ease-out, scale-in 0.25s ease-out',
        'loop-rotate': 'loop-rotate 8s linear infinite',
        'loop-float-sm': 'loop-float-sm 3s ease-in-out infinite',
        'loop-float-md': 'loop-float-md 4s ease-in-out infinite',
        'loop-float-lg': 'loop-float-lg 6s ease-in-out infinite',
        'loop-pulse-subtle': 'loop-pulse-subtle 2s ease-in-out infinite',
        'loop-pulse-glow': 'loop-pulse-glow 2s ease-in-out infinite',
        'loop-bounce': 'loop-bounce 1.5s ease-in-out infinite',
        'loop-wobble': 'loop-wobble 2s ease-in-out infinite',
        'loop-swing': 'loop-swing 3s ease-in-out infinite',
        'loop-spin-slow': 'loop-spin-slow 20s linear infinite',
        'marquee-horiz': 'marquee-horiz 30s linear infinite',
        'marquee-horiz-reverse': 'marquee-horiz-reverse 30s linear infinite',
        'marquee-vert': 'marquee-vert 20s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.6s ease-out forwards',
'fade-in-right': 'fade-in-right 0.6s ease-out forwards',
        'zoom-in': 'zoom-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'slide-down': 'slide-down 0.5s ease-out forwards',
        'world-invert': 'world-invert 2s ease-in-out infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
