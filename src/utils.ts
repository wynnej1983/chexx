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

export const getPieceColor = (piece: string) =>
  piece !== '-' && piece === piece.toUpperCase() ? 'white' : 'black';

export const getPlayer = (fen: string) =>
  fen.split(' ')[1] === 'w' ? 'white' : 'black';

export const indexToPos = (idx: number) =>
  `${'abcdefgh'[idx % 8]}${8 - Math.floor(idx / 8)}`;

export const posToIndex = (pos: string) => {
  const [rank, row] = pos;
  const index = (8 - Number(row)) * 8 + rank.charCodeAt(0) - 'a'.charCodeAt(0);
  return index;
};
