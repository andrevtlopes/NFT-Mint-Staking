module.exports = {
    content: [
        './components/**/*.{html,js,ts,jsx,tsx}',
        './pages/**/*.{html,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ["cupcake", "dark"],
    },
};
