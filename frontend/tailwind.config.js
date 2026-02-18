/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#ea580c", // Orange-600 - Dynamic & artisan-like
                secondary: "#3b82f6", // Blue-500 - Trustworthy
                background: "#f8fafc", // Slate-50 - Clean background
                surface: "#ffffff",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
