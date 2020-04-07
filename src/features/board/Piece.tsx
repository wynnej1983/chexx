import React from 'react';
import styled from 'styled-components/native';
import {tileSize} from '../../utils';

type Props = {
  type: string;
  index: number;
  children: string;
};

export const Piece = (props: Props) => {
  const {children, ...rest} = props;
  return (
    <Container {...rest} pointerEvents={'none'}>
      <Inner {...rest}>{children}</Inner>
    </Container>
  );
};

const Container = styled.View<Props>`
  position: absolute;
  left: ${props => (props.index % 8) * tileSize}px;
  top: ${props => Math.floor(props.index / 8) * tileSize}px;
  width: ${tileSize}px;
  height: ${tileSize}px;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.Text<Props>`
  color: ${props => (/[A-Z]/.test(props.type) ? 'white' : 'black')};
  font-size: 60px;
  line-height: 60px;
`;
