import { createSlice } from '@reduxjs/toolkit';
import { intiialState } from './initialState';

export const gameSlice = createSlice({
    name: 'game',
    initialState: intiialState,
    reducers: {
        resetGame: () => intiialState,
    },
});

export const { resetGame } = gameSlice.actions;

export default gameSlice.reducer;