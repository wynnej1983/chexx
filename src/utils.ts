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

export const getPieces = (fen: string) =>
  fen
    .split(' ')[0]
    .split('/')
    .map(r => r.replace(/\d/g, p => '-'.repeat(+p)))
    .join('')
    .split('');

export const getPlayer = (fen: string) =>
  fen.split(' ')[1] === 'w' ? 'white' : 'black';

export const indexToSan = (i: number) =>
  `${'abcdefgh'[i % 8]}${8 - Math.floor(i / 8)}`;

export const sanToIndex = (san: string) => {
  const [rank, row] = san;
  const index = (8 - Number(row)) * 8 + rank.charCodeAt(0) - 'a'.charCodeAt(0);
  return index;
};
