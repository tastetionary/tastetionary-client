import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

export const StyledToast = styled(ToastContainer)`
  padding: 0 20px;
  left: unset;
  transform: unset;

  .Toastify__toast,
  .Toastify__toast--error {
    width: auto;
    padding: 10px 61px;
    min-height: 42px;
    background-color: rgba(0, 0, 0, 0.6);
    margin-bottom: 0;
  }

  &&&.Toastify__toast-container {
    display: flex;
    justify-content: center;
    width: 100% !important;
  }

  .Toastify__toast-icon {
    width: 0px !important;
  }

  .Toastify__toast-body {
    padding: 0 !important;
    margin: 0 !important;
    display: block !important;

    div {
      font-family: var(--Pretendard-Variable) !important;
      font-size: 14px !important;
      font-style: normal !important;
      font-weight: 400 !important;
      line-height: 160% !important;
      text-align: center;
      color: #ffffff !important;
      white-space: pre-line !important;
    }
  }

  &&&.Toastify__toast-container--top-center {
    top: 120px;
  }
`;
