import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Chess} from 'chess.js';
import {AppThunk} from '../../app/store';
import {indexToPos, posToIndex, getPieces} from '../../utils';

interface BoardState {
  fen: string;
  selectedPiece: number;
  validMoves: number[];
  lastMove: number[];
  isCheck: boolean;
  isGameOver: boolean;
  ai: boolean;
}

const initialState: BoardState = {
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  selectedPiece: -1,
  validMoves: [],
  lastMove: [],
  isCheck: false,
  isGameOver: false,
  ai: true,
};

export const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
    selectPiece: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const {fen} = state;
      state.selectedPiece = index;
      const pos = indexToPos(index);
      const engine = new Chess(fen);
      const validMoves = engine
        .moves({square: pos, verbose: true})
        .map((move: any) => posToIndex(move.to));
      state.validMoves = validMoves;
    },
    unSelectPiece: state => {
      state.selectedPiece = -1;
    },
    move: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const {selectedPiece, fen} = state;
      const from = indexToPos(selectedPiece);
      const to = indexToPos(index);
      const promotion =
        (to.includes('1') || to.includes('8')) &&
        getPieces(fen)[selectedPiece].toLowerCase() === 'p' &&
        'q'; // default to queen
      const engine = new Chess(fen);
      engine.move({from, to, promotion});
      state.lastMove = [selectedPiece, index];
      state.isCheck = engine.in_check();
      state.isGameOver = engine.game_over();
      state.fen = engine.fen();
      state.selectedPiece = -1;
      state.validMoves = [];
    },
  },
});

export const playerMove = (index: number): AppThunk => (dispatch, getState) => {
  dispatch(move(index));
  const {
    board: {ai, isGameOver},
  } = getState();
  if (ai && !isGameOver) {
    setTimeout(() => dispatch(aiMove()), 2000);
  }
};

export const aiMove = (): AppThunk => (dispatch, getState) => {
  const {
    board: {fen},
  } = getState();
  const engine = new Chess(fen);
  const validMoves = engine.moves({verbose: true}).map((move: any) => ({
    from: posToIndex(move.from),
    to: posToIndex(move.to),
  }));
  const {from, to} = validMoves[Math.floor(Math.random() * validMoves.length)];
  dispatch(selectPiece(from));
  dispatch(move(to));
};

export const {selectPiece, unSelectPiece, move} = board.actions;

export default board.reducer;
