// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'bg': '#060504',
        'bg2': '#0D0B08',
        'bg3': '#151210',
        'card': '#111009',
        'card2': '#1A1714',
        'border': '#2A2520',
        'border2': '#3A3530',
        'gold': '#C9A84C',
        'gold2': '#E8C87A',
        'gold3': '#F5E0A8',
        'gold-dim': 'rgba(201,168,76,0.1)',
        'green': '#2A9D6A',
        'green-dim': 'rgba(42,157,106,0.1)',
        'red': '#C0392B',
        'red-dim': 'rgba(192,57,43,0.1)',
        'ink': '#F0EAD6',
        'ink2': '#9A917E',
        'ink3': '#5A5248',
      },
      fontFamily: {
        'fd': ['Cormorant Garamond', 'serif'],
        'fm': ['DM Mono', 'monospace'],
        'fb': ['Outfit', 'sans-serif'],
      },
      borderRadius: {
        'r': '14px',
        'rs': '8px',
      },
      animation: {
        'bl': 'bl 2s infinite',
      },
      keyframes: {
        bl: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
}