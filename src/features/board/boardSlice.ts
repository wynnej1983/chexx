import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Chess} from 'chess.js';
import {AppThunk} from '../../app/store';
import {indexToPos, posToIndex, getPieces} from '../../utils';

interface BoardState {
  fen: string;
  selectedTile: number;
  validMoves: number[];
  lastMove: number[];
  isCheck: boolean;
  isGameOver: boolean;
  ai: boolean;
}

const initialState: BoardState = {
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  selectedTile: -1,
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
    selectTile: (state, action: PayloadAction<number>) => {
      state.selectedTile = action.payload;
    },
    unSelectTile: state => {
      state.selectedTile = -1;
    },
    move: (state, action: PayloadAction<number>) => {
      const {selectedTile: selectedIndex, fen} = state;
      const from = indexToPos(selectedIndex);
      const to = indexToPos(action.payload);
      const engine = new Chess(fen);
      const promotion =
        (to.includes('1') || to.includes('8')) &&
        getPieces(fen)[selectedIndex].toLowerCase() === 'p' &&
        'q'; // default to queen
      engine.move({from, to, promotion});
      state.lastMove = [selectedIndex, action.payload];
      state.isCheck = engine.in_check();
      state.isGameOver = engine.game_over();
      state.fen = engine.fen();
      state.selectedTile = -1;
      state.validMoves = [];
    },
    getValidMovesSuccess: (state, action: PayloadAction<number[]>) => {
      state.validMoves = action.payload;
    },
  },
});

export const {
  getValidMovesSuccess,
  selectTile,
  unSelectTile,
  move,
} = board.actions;

export const fetchValidMoves = (index: number): AppThunk => (
  dispatch,
  getState,
) => {
  dispatch(selectTile(index));
  const {
    board: {fen},
  } = getState();
  const pos = indexToPos(index);
  const engine = new Chess(fen);
  const validMoves = engine
    .moves({square: pos, verbose: true})
    .map((move: any) => posToIndex(move.to));
  dispatch(getValidMovesSuccess(validMoves));
};

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
  const aiMove = validMoves[Math.floor(Math.random() * validMoves.length)];
  dispatch(selectTile(aiMove.from));
  dispatch(move(aiMove.to));
};

export default board.reducer;
