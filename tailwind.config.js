/** @type {import('tailwindcss').Config} */

const _0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}`) };
const px0_50 = { ...Array.from(Array(51)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_400 = { ...Array.from(Array(401)).map((_, i) => `${i}px`) };

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      sm: '320px',
      mobile: { max: '768px' },
    },
    extend: {
      borderRadius: px0_50,
      borderWidth: px0_50,
      fontSize: px0_100,
      spacing: px0_200,
      width: px0_400,
      height: px0_400,
      maxWidth: px0_400,
      padding: px0_100,
      zIndex: _0_100,
      bgOpacity: px0_100,
      transitionProperty: {
        visibility: 'visibility',
      },
      transitionDuration: {
        250: '250ms',
      },
      transitionTimingFunction: {
        'in-out': 'ease-in-out',
      },
      fontFamily: {
        pretendard: ['var(--Pretendard-Variable)'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        slideDown: {
          '0%': { transform: 'translateY(0px)', opacity: 1 },
          '100%': { transform: 'translateY(100vh)', opacity: 0 },
        },
        slideUp: {
          '0%': { transform: 'translateY(100vh)', opacity: 0 },
          '100%': { transform: 'translateY(0px)', opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.25s ease-in-out',
        fadeOut: 'fadeOut 0.25s ease-in-out',
        slideDown: 'slideDown 0.4s ease-in-out',
        slideUp: 'slideUp 0.4s ease-in-out',
      },
      backgroundImage: {
        ic_checkbox_inactive: "url('/image/CheckBox/ic_checkbox_inactive.svg')",
        ic_checkbox_active: "url('/image/CheckBox/ic_checkbox_active.svg')",
      },
      spacing: {
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        xxxl: '80px',
      },
      boxShadow: {
        negative: '-1px -1px 0 rgba(0, 0, 0, 0.25)',
        positive: '1px 1px 0 rgba(0, 0, 0, 0.25)',
      },
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      textColor: '#37474F',
      primary: {
        y90: '#FF7002',
        y80: '#FF9103',
        y70: '#FFA202',
        y60: '#FFB400',
        y50: '#FFC30B',
        y40: '#FFCB29',
        y30: '#FED750',
        y20: '#FFE183',
        y10: '#FFEDB3',
        y05: '#FFF8E1',
      },
      secondary: {
        o90: '#C13001',
        o80: '#D94000',
        o70: '#E64801',
        o60: '#F44E00',
        o50: '#FF5601',
        o40: '#FF6E32',
        o30: '#FE895A',
        o20: '#FFAA8A',
        o10: '#FFCBB8',
        o05: '#FCE9E6',
      },
      neutral: {
        bg90: '#253238',
        bg80: '#37474F',
        bg70: '#455A64',
        bg60: '#546E7A',
        bg50: '#607D8B',
        bg40: '#78909C',
        bg30: '#90A4AE',
        bg20: '#B0BEC5',
        bg10: '#CFD8DB',
        bg05: '#EDEFF1',
      },
      simentic: {
        dg90: '#207B00',
        dg50: '#3FC500',
        r90: '#CB2528',
        r60: '#E53835',
        black: '#000000',
        white: '#FFFFFF',
      },
      red: {
        r90: '#B71B1C',
        r80: '#C62728',
        r70: '#D32E30',
        r60: '#E53835',
        r50: '#F44236',
        r40: '#EF5350',
        r30: '#E57373',
        r20: '#EF9A9A',
        r10: '#FFCDD1',
        r05: '#FFEBEE',
      },
      orange: {
        o90: '#C13001',
        o80: '#D94000',
        o70: '#E64801',
        o60: '#F44E00',
        o50: '#FF5601',
        o40: '#FF6E32',
        o30: '#FE895A',
        o20: '#FFAA8A',
        o10: '#FFCBB8',
        o05: '#FCE9E6',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('not-disabled', '&:not(:disabled)');
      addVariant('not-last', '&:not(:last-child)');
    }),
  ],
};
