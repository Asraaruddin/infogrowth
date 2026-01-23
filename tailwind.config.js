module.exports = {
  theme: {
    extend: {
      animation: {
        gradientMove: 'gradientMove 6s ease infinite',
        glowPulse: 'glowPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        gradientMove: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.9' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
