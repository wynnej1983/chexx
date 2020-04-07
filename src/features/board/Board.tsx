import React from 'react';
import {Dimensions, Text} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {RootState} from 'src/app/rootReducer';
import {Tile} from './Tile';
import {Piece} from './Piece';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-vertical: 50%;
`;

const Fen = styled.Text`
  font-size: 10px;
  margin-top: 100%;
`;

export const pieceCode = {
  r: '\u265c',
  n: '\u265e',
  b: '\u265d',
  q: '\u265b',
  k: '\u265a',
  p: '\u2659',
};

type Props = {};

export const Board = ({}: Props) => {
  const fen = useSelector((state: RootState) => state.board.fen);
  const screenWidth = Math.floor(Dimensions.get('window').width);
  const tileSize = screenWidth / 8;

  return (
    <Container>
      <Fen>{fen}</Fen>
      {Array.from(Array(64), (_, idx) => (
        <Tile
          key={idx}
          color={
            Math.floor(idx / 8 + idx) % 2 == 0
              ? 'rgb(236,209,166)'
              : 'rgb(165,117,81)'
          }
          left={(idx % 8) * tileSize}
          top={Math.floor(idx / 8) * tileSize}
          size={tileSize}
        />
      ))}
      {fen
        .split(' ')[0]
        .split('/')
        .map(r => r.replace(/\d/g, p => p.repeat(Number(p))))
        .join('')
        .split('')
        .map((p, idx) => (
          <Piece
            key={idx}
            color={/[A-Z]/.test(p) ? 'white' : 'black'}
            left={(idx % 8) * tileSize}
            top={Math.floor(idx / 8) * tileSize}
            size={tileSize}>
            {pieceCode[p.toLowerCase()]}
          </Piece>
        ))}
    </Container>
  );
};
