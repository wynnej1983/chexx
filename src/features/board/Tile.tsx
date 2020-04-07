import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity<Props>`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  background-color: ${props => props.color}
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

type Props = {
  color: string;
  left: number;
  top: number;
  size: number;
};

export const Tile = (props: Props) => {
  return <Container {...props} />;
};
