import { createSlice } from '@reduxjs/toolkit';
import { intiialState } from './initialState';

export const gameSlice = createSlice({
    name: 'game',
    initialState: intiialState,
    reducers: {
        resetGame: () => intiialState,
        updateDiceNo: (state, action) => {
            state.diceNo = action.payload.diceNo;
            state.isDiceRolled = true;
        },
        enablePileSelection: (state, action) => {
            state.touchDiceBlock = true;
            state.pileSelectionPlayer = action.payload.playerNo;
        },
        enableCellSelection: (state, action) => {
            state.touchDiceBlock = true;
            state.cellSelectionPlayer = action.payload.playerNo;
        },
        disableTouch: state => {
            state.touchDiceBlock = true;
            state.cellSelectionPlayer = -1;
            state.pileSelectionPlayer = -1;
        },
        unfreezeDice: state => {
            state.touchDiceBlock = false;
            state.isDiceRolled = false;
        },
        updateFireworks: (state, action) => {
            state.fireworks = action.payload;
        },
        announceWinner: (state, action) => {
            state.winner = action.payload;
        },
        updatePlayerChance: (state, action) => {
            state.chancePlayer = action.payload.chancePlayer;
            state.touchDiceBlock = false;
            state.isDiceRolled = false;
        },
    },
});

export const { resetGame, updateDiceNo, announceWinner, updateFireworks, updatePlayerChance, unfreezeDice, disableTouch, enableCellSelection, enablePileSelection } = gameSlice.actions;

export default gameSlice.reducer;