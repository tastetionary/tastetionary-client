import { DefaultTheme } from 'styled-components';

const colors = {
    white: '#ffffff',
    black: '#000000',
};

export const theme: DefaultTheme = {
    colors,
    textColor: '#343A40',
};

export type Theme = typeof theme;

export type Color = typeof colors;
