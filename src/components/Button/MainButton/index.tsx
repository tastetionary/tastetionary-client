import * as S from './page.styled';

interface Props {
  btnText: string;
  [key: string]: any;
}

export default function MainButton({ btnText, ...rest }: Props) {
  return <S.Button {...rest}>{btnText}</S.Button>;
}
