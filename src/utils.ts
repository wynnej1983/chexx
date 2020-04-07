import {Dimensions} from 'react-native';

export const screenWidth = Math.floor(Dimensions.get('window').width);
export const tileSize = screenWidth / 8;

type pieceCodeOptions = {
  [key: string]: string;
};

export const pieceCode: pieceCodeOptions = {
  r: '\u265c',
  n: '\u265e',
  b: '\u265d',
  q: '\u265b',
  k: '\u265a',
  p: '\u2659',
};

export const parseFen = (fen: string) =>
  fen
    .split(' ')[0]
    .split('/')
    .map(r => r.replace(/\d/g, p => '-'.repeat(+p)))
    .join('')
    .split('');
