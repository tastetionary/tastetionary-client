import { StyledToast } from './page.styled';

export default function Toast() {
  return (
    <StyledToast
      position="top-center"
      autoClose={200000}
      hideProgressBar={true}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      icon={() => <></>}
      closeButton={() => <></>}
    />
  );
}
