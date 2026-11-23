/* Configurazione Tailwind (CDN). Palette e font del brand definiti in un solo punto.
   Per cambiare i colori dell'associazione modifica questi valori
   (e le variabili --ink, --paper, ... in assets/css/style.css). */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink: '#14213D',
        paper: '#FFF7E8',
        brand: { DEFAULT: '#2F5BEA', 100: '#DCE5FF', 600: '#2549C4', 700: '#1C3899' },
        sun: { DEFAULT: '#FFC53D', 100: '#FFEFC2', 300: '#FFD879' },
        coral: { DEFAULT: '#FF6B4A', 100: '#FFDDD3' },
        mint: { DEFAULT: '#2EC4A0', 100: '#D1F3EA' },
      },
      fontFamily: {
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
};
