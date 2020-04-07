import React from 'react';
import styled from 'styled-components/native';
import {tileSize} from '../../utils';

type Props = {
  disabled: boolean;
  index: number;
};

export const Tile = (props: Props) => {
  return <Container {...props} />;
};

const Container = styled.TouchableOpacity<Props>`
  position: absolute;
  left: ${props => (props.index % 8) * tileSize}px;
  top: ${props => Math.floor(props.index / 8) * tileSize}px;
  background-color: ${props =>
    Math.floor(props.index / 8 + props.index) % 2 == 0
      ? 'rgb(236,209,166)'
      : 'rgb(165,117,81)'};
  }
  width: ${tileSize}px;
  height: ${tileSize}px;
`;
