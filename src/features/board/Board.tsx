import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {RootState} from 'src/app/rootReducer';
import {Tile} from './Tile';
import {Piece} from './Piece';
import {getPlayer, getPieces, getPieceColor} from '../../utils';
import {fetchValidMoves, unSelectTile, playerMove} from './boardSlice';

type Props = {};

export const Board = ({}: Props) => {
  const {
    fen,
    selectedTile,
    validMoves,
    lastMove,
    isCheck,
    isGameOver,
  } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const player = getPlayer(fen);
  const pieces = getPieces(fen);

  const onTilePressed = (idx: number) => {
    if (selectedTile === idx) {
      dispatch(unSelectTile());
    } else if (getPieceColor(pieces[idx]) === player) {
      dispatch(fetchValidMoves(idx));
    } else {
      dispatch(playerMove(idx));
    }
  };

  return (
    <Container>
      {pieces.map((piece, idx) => (
        <React.Fragment key={idx}>
          <Tile
            index={idx}
            disabled={
              isGameOver ||
              (selectedTile < 0
                ? getPieceColor(pieces[idx]) !== player
                : !validMoves.includes(idx) &&
                  getPieceColor(pieces[idx]) !== player)
            }
            selected={selectedTile === idx}
            lastMove={lastMove.includes(idx)}
            validMove={selectedTile > -1 && validMoves.includes(idx)}
            isCheck={
              isCheck && pieces[idx] === (player === 'white' ? 'K' : 'k')
            }
            onPress={onTilePressed}
          />
          {piece !== '-' && <Piece index={idx} type={piece} />}
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
