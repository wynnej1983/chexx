import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import rootReducer, {RootState} from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
