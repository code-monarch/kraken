import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/**/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/styles/**/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        raleway: "var(--font-raleway)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        primaryBtnHoverShadow: "var(--primary-btn-hover-shadow)",
        primarySmBtnHoverShadow: "var(--primary-sm-btn-hover-shadow)",
        secondaryBtnHoverShadow: "var(--secondary-btn-hover-shadow)",
        secondarySmBtnHoverShadow: "var(--secondary-sm-btn-hover-shadow)",
        calendarShadow: "-20px 16px 32px 0px hsla(240, 13%, 72%, 0.2)",
      },
      spacing: {
        "8": "var(--spacing)",
        "16": "calc(var(--spacing) + 8px)",
        "24": "calc(var(--spacing) + 16px)",
        "32": "calc(var(--spacing) + 24px)",
        "40": "calc(var(--spacing) + 32px)",
        "56": "calc(var(--spacing) + 48px)",
        "72": "calc(var(--spacing) + 64px)",
        "80": "calc(var(--spacing) + 72px)",
        "96": "calc(var(--spacing) + 88px)",
        "120": "calc(var(--spacing) + 112px)",
      },
      fontSize: {
        "18": "1.25rem",
        "24": "1.5rem",
        "32": "2rem",
        "40": "2.5rem",
        "48": "3rem",
        "56": "3.5rem",
        "64": "4rem",
      },
      lineHeight: {
        "22": "1.375rem",
        "26": "1.65rem",
        "35": "2.2rem",
        "44": "2.75rem",
        "52": "3.3rem",
        "61": "3.85rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
