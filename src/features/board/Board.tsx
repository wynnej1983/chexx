import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {RootState} from 'src/app/rootReducer';
import {Tile} from './Tile';
import {Piece} from './Piece';
import {getPlayer, getPieces, getPieceColor} from '../../utils';
import {selectPiece, unSelectPiece, playerMove} from './boardSlice';

type Props = {};

export const Board = ({}: Props) => {
  const {
    fen,
    selectedPiece,
    validMoves,
    lastMove,
    isCheck,
    isGameOver,
  } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const player = getPlayer(fen);
  const pieces = getPieces(fen);

  const canSelectTile = (idx: number) =>
    !isGameOver &&
    (selectedPiece < 0
      ? getPieceColor(pieces[idx]) === player
      : validMoves.includes(idx) || getPieceColor(pieces[idx]) === player);

  const onTileSelected = (idx: number) => {
    if (getPieceColor(pieces[idx]) === player) {
      selectedPiece !== idx
        ? dispatch(selectPiece(idx))
        : dispatch(unSelectPiece());
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
            disabled={!canSelectTile(idx)}
            selected={selectedPiece === idx}
            lastMove={lastMove.includes(idx)}
            validMove={selectedPiece > -1 && validMoves.includes(idx)}
            isCheck={
              isCheck && pieces[idx] === (player === 'white' ? 'K' : 'k')
            }
            onPress={onTileSelected}
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
