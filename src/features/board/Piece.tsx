import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity<Props>`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.Text<Props>`
  color: ${props => props.color};
  font-size: 60px;
  line-height: 60px;
`;

type Props = {
  children: string;
  color: string;
  left: number;
  top: number;
  size: number;
};

export const Piece = (props: Props) => {
  const {children, ...rest} = props;
  return (
    <Container {...rest}>
      <Inner {...rest}>{children}</Inner>
    </Container>
  );
};
