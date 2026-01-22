import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    
    
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505", // Derin Siyah
        glass: {
          100: "rgba(255, 255, 255, 0.05)", // Çok hafif transparan
          200: "rgba(255, 255, 255, 0.10)",
          border: "rgba(255, 255, 255, 0.08)",
        },
        neon: {
          blue: "#00f0ff",   // Cyberpunk Mavi
          purple: "#bf00ff", // Elektrik Mor
          green: "#00ff9d",  // Kazanç Yeşili
          red: "#ff0055",    // Kayıp Kırmızısı
        },
      },
      backgroundImage: {
        'noise': "url('/noise.png')", // Noise texture (public klasörüne koyarsan çalışır)
        'glow-gradient': "radial-gradient(circle at center, rgba(0, 240, 255, 0.15) 0%, rgba(5, 5, 5, 0) 70%)",
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
export default config;