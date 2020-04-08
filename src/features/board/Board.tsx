import React from 'react';
import {LayoutAnimation} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {RootState} from 'src/app/rootReducer';
import {Tile} from './Tile';
import {Piece} from './Piece';
import {getPlayer, getPieces} from '../../utils';
import {fetchValidMoves, unSelectTile, playerMove} from './boardSlice';

type Props = {};

export const Board = ({}: Props) => {
  const {
    fen,
    selectedIndex,
    validMoves,
    lastMove,
    check,
    gameOver,
  } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const player = getPlayer(fen);
  const pieces = getPieces(fen);

  const onTilePressed = (index: number) => {
    if (selectedIndex < 0) {
      dispatch(fetchValidMoves(index));
    } else if (selectedIndex === index) {
      dispatch(unSelectTile());
    } else {
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      dispatch(playerMove(index));
    }
  };

  return (
    <Container>
      {pieces.map((piece, idx) => (
        <React.Fragment key={idx}>
          <Tile
            index={idx}
            disabled={
              gameOver ||
              (pieces[idx] === '-' && selectedIndex < 0) ||
              (!validMoves.includes(idx) &&
                selectedIndex > -1 &&
                idx !== selectedIndex) ||
              (selectedIndex < 0 &&
                (pieces[idx] === pieces[idx].toUpperCase()
                  ? 'white'
                  : 'black') !== player)
            }
            selected={selectedIndex === idx}
            lastMove={lastMove.includes(idx)}
            validMove={selectedIndex > -1 && validMoves.includes(idx)}
            check={check && pieces[idx] === (player === 'white' ? 'K' : 'k')}
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
