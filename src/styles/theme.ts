import { DefaultTheme } from 'styled-components';

const colors = {
  white: '#ffffff',
  black: '#000000',
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
};

export const theme: DefaultTheme = {
  colors,
  textColor: colors.neutral.bg80,
};

export type Theme = typeof theme;

export type Color = typeof colors;
