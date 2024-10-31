import { combineReducers } from "@reduxjs/toolkit";
import { gameSlice } from "./reducers/gameSlice";

const rootReducer = combineReducers({
    game: gameSlice.reducer,
});

export default rootReducer;