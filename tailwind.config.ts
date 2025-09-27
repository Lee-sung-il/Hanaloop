import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate" // 1. require 대신 import를 사용합니다.

const config = {
    darkMode: "class",
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
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

        },
    },
    plugins: [tailwindcssAnimate],
} satisfies Config

export default config