import {createSlice} from '@reduxjs/toolkit';

interface BoardState {
  fen: string;
}

const initialState: BoardState = {
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
});

export default boardSlice.reducer;
