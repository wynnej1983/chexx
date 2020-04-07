import React from 'react';
import styled from 'styled-components/native';
import {tileSize, pieceCode} from '../../utils';

type Props = {
  index: number;
  type: string;
};

export const Piece = ({index, type}: Props) => {
  const color = /[A-Z]/.test(type) ? 'white' : 'black';
  return (
    <Container index={index} pointerEvents={'none'}>
      <Glyph color={color}>{pieceCode[type.toLowerCase()]}</Glyph>
    </Container>
  );
};

const Container = styled.View<{index: number}>`
  position: absolute;
  left: ${props => (props.index % 8) * tileSize}px;
  top: ${props => Math.floor(props.index / 8) * tileSize}px;
  width: ${tileSize}px;
  height: ${tileSize}px;
  align-items: center;
  justify-content: center;
`;

const Glyph = styled.Text<{color: string}>`
  color: ${props => props.color};
  font-size: 60px;
  line-height: 60px;
`;
