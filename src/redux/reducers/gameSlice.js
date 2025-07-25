import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState,
    reducers: {
        resetGame: () => initialState,
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
        updatePlayerPiceValue: (state, action) => {
            const { playerNo, pieceId, pos, travelCount } = action.payload;
            const playerPices = state[playerNo];
            const piece = playerPices.find(p => p.id === pieceId);
            state.pileSelectionPlayer = -1;
            state.cellSelectionPlayer = -1;

            if (piece) {
                piece.pos = pos;
                piece.travelCount = travelCount;
                const currentPostionIndex = state.currentPositions.findIndex(p => p.id === pieceId);
                
                if (pos == 0) {
                    if (currentPostionIndex !== -1) {
                        state.currentPositions.splice(currentPostionIndex, 1)
                    }
                }else {
                    if (currentPostionIndex !== -1) {
                        state.currentPositions[currentPostionIndex] = {
                            id: pieceId,
                            pos
                        };
                    } else {
                        state.currentPositions.push({ id: pieceId, pos });
                    }
                }

            }
        },
        updatePlayerNames: (state, action) => {
            state.playerNames = action.payload;
        },
    },
});

export const { resetGame, updateDiceNo, announceWinner, updateFireworks, updatePlayerChance, unfreezeDice, disableTouch, enableCellSelection, enablePileSelection, updatePlayerPiceValue, updatePlayerNames } = gameSlice.actions;

export default gameSlice.reducer;