import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {RootState} from 'src/app/rootReducer';
import {Tile} from './Tile';
import {Piece} from './Piece';
import {pieceCode, parseFen} from '../../utils';

type Props = {};

export const Board = ({}: Props) => {
  const {fen, selectedIndex} = useSelector((state: RootState) => state.board);
  const pieces = parseFen(fen);

  console.log(pieces);

  return (
    <Container>
      {pieces.map((piece, idx) => (
        <React.Fragment key={idx}>
          <Tile index={idx} disabled={pieces[idx] === '-'} />
          {piece !== '-' && (
            <Piece index={idx} type={piece}>
              {pieceCode[piece.toLowerCase()]}
            </Piece>
          )}
        </React.Fragment>
      ))}
      <Fen>{fen}</Fen>
    </Container>
  );
};

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
