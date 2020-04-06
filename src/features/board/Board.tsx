import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {RootState} from 'src/app/rootReducer';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Fen = styled.Text`
  font-size: 12px;
`;

type Props = {};

export const Board = ({}: Props) => {
  const fen = useSelector((state: RootState) => state.board.fen);

  return (
    <Container>
      <Fen>{fen}</Fen>
    </Container>
  );
};
