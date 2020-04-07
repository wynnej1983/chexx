import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Chess} from 'chess.js';
import {AppThunk} from '../../app/store';
import {indexToSan, sanToIndex, getPlayer} from '../../utils';

interface BoardState {
  fen: string;
  selectedIndex: number;
  validMoves: number[];
}

const initialState: BoardState = {
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  selectedIndex: -1,
  validMoves: [],
};

export const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
    selectTile: (state, action: PayloadAction<number>) => {
      state.selectedIndex = action.payload;
    },
    move: (state, action: PayloadAction<number>) => {
      const from = indexToSan(state.selectedIndex);
      const to = indexToSan(action.payload);
      const engine = new Chess(state.fen);
      engine.move({from, to});
      state.fen = engine.fen();
      state.selectedIndex = -1;
      state.validMoves = [];
    },
    getValidMovesSuccess: (state, action: PayloadAction<number[]>) => {
      state.validMoves = action.payload;
    },
  },
});

export const {getValidMovesSuccess, selectTile, move} = board.actions;

export const fetchValidMoves = (index: number): AppThunk => (
  dispatch,
  getState,
) => {
  dispatch(selectTile(index));
  const {
    board: {fen},
  } = getState();
  const isWhite = getPlayer(fen) === 'white';
  const san = indexToSan(index);
  const engine = new Chess(fen);
  const validMoves = engine
    .moves({square: san})
    .map((san: string) => sanToIndex(san, isWhite));
  dispatch(getValidMovesSuccess(validMoves));
};

export default board.reducer;
