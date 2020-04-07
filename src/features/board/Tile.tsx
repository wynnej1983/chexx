import React from 'react';
import styled from 'styled-components/native';
import {tileSize} from '../../utils';

type Props = {
  disabled: boolean;
  index: number;
  selected: boolean;
  validMove: boolean;
  onPress: (index: number) => void;
};

export const Tile = (props: Props) => {
  const {index, validMove, onPress} = props;
  return (
    <Container {...props} onPress={() => onPress(index)}>
      {validMove && <Dot />}
    </Container>
  );
};

const Container = styled.TouchableOpacity<Props>`
  position: absolute;
  left: ${props => (props.index % 8) * tileSize}px;
  top: ${props => Math.floor(props.index / 8) * tileSize}px;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.selected
      ? 'rgb(200,221,243)'
      : Math.floor(props.index / 8 + props.index) % 2 == 0
      ? 'rgb(236,209,166)'
      : 'rgb(165,117,81)'};
  }
  width: ${tileSize}px;
  height: ${tileSize}px;
`;

const Dot = styled.View<Props>`
  background-color: 'rgb(200,221,243)'
  width: ${tileSize / 2}px;
  height: ${tileSize / 2}px;
  border-radius: ${tileSize / 4}px;
`;
