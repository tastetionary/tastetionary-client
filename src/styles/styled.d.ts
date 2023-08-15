import 'styled-components';
import { Color, Theme } from './theme';

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {
        colors: Color;
        textColor: string;
    }
}
