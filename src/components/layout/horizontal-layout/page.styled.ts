import styled from 'styled-components';

export const Wrapper = styled.div<{ $subject: 'menu' | 'restaurant' }>`
  background: ${({ theme, $subject }) =>
    $subject === 'menu'
      ? `radial-gradient(circle at bottom , ${theme.colors.secondary.o10} 0.5px, transparent 0) top/1px 20px;`
      : `radial-gradient(circle at bottom , ${theme.colors.primary.y10} 0.5px, transparent 0) top/1px 20px;`};
`;
