import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Chess} from 'chess.js';
import {AppThunk} from '../../app/store';
import {indexToPos, posToIndex, getPlayer, getPieces} from '../../utils';

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
    unSelectTile: state => {
      state.selectedIndex = -1;
    },
    move: (state, action: PayloadAction<number>) => {
      const from = indexToPos(state.selectedIndex);
      const to = indexToPos(action.payload);
      const engine = new Chess(state.fen);
      const promotion =
        (to.includes('1') || to.includes('8')) &&
        getPieces(state.fen)[state.selectedIndex].toLowerCase() === 'p' &&
        'q'; // default to queen
      engine.move({from, to, promotion});
      state.fen = engine.fen();
      state.selectedIndex = -1;
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
  const isWhite = getPlayer(fen) === 'white';
  const pos = indexToPos(index);
  const engine = new Chess(fen);
  const validMoves = engine
    .moves({square: pos, verbose: true})
    .map((move: any) => posToIndex(move.to, isWhite));
  dispatch(getValidMovesSuccess(validMoves));
};

export default board.reducer;
