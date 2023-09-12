import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset};

    * {
        font-family: var(--Galmuri-9) !important;
        box-sizing: border-box;
        color: ${({ theme }) => theme.colors.neutral.bg80};
    }

    body {
        overflow-x: hidden;
    }

    a {
        all: unset;
    }

    input, textarea {
        font-family: var(--Pretendard-Variable) !important;
        outline: none;
        border: none;
    }

    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;             
        margin: 0;         
    }

    button {
        cursor: pointer;
        outline: none;
        border: none;
        background-color: inherit;

        &:disabled {
            cursor: not-allowed;
        }
    }
`;
