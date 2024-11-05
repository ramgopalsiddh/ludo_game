import { SafeSpots, StarSpots, startingPoints, turningPoints, victoryStart } from "../../helpers/PlotData";
import { playSound } from "../../helpers/SoundUtility";
import { selectCurrentPostions, selectDiceNo } from "./gameSelectors"
import { disableTouch, unfreezeDice, updatePlayerPiceValue } from "./gameSlice";

  // Promise for delay to show dice number
const delay = ms => new Promise(resolver => setTimeout(resolver, ms));

export const handleForwardThunk = (playerNo, id, pos) => async (dispatch, getState) => {
    
    const state = getState()
    const plottedPieces = selectCurrentPostions(state)
    const diceNo = selectDiceNo(state)

    let alpha = playerNo == 1 ? 'A' : playerNo == 2 ? 'B' : playerNo == 3 ? 'C' : 'D';

    const peicesAtPosition = plottedPieces?.filter(item => item.pos == pos);
    const piece = peicesAtPosition[
        peicesAtPosition.findIndex(item => item.id[0] == alpha)
    ];

    dispatch(disableTouch());

    let finalPath = piece.pos;
    const beforePlayerPiece = state.game[`player${playerNo}`].find(item => item.id == id,);
    let travelCount = beforePlayerPiece.travelCount;

    for (let i = 0; i < diceNo; i++){
        const updatedPosition = getState()
        const playerPiece = updatedPosition?.game[`player${playerNo}`].find(item => item.id == id,);

        let path = playerPiece.pos + 1;
        if (turningPoints.includes(path) && turningPoints[playerNo - 1] == path) {
            path = victoryStart[playerNo - 1];
        }
        if (path == 53) {
            path =1
        }

        finalPath = path;
        travelCount += 1;

        dispatch(updatePlayerPiceValue({
            playerNo: `player${playerNo}`,
            pieceId: playerPiece.id,
            pos: path,
            travelCount: travelCount,

            
        }),
        );
        playSound('pile_move');
        await delay(200);
    }


    const updatedState = getState()
    const updatedPlottedPieces = selectCurrentPostions(updatedState)

    // Check Colliding
    const finalPlot = updatedPlottedPieces?.filter(
        item => item.pos == finalPath,
    );
    const ids = finalPlot.map(item => item.id[0]);
    const uniqueIds = new Set(ids)
    const areDifferentIds = uniqueIds.size > 1

    if (SafeSpots.includes(finalPath) || StarSpots.includes(finalPath)) {
        playSound('safe_spot')
    }

    if (areDifferentIds && !SafeSpots.includes(finalPlot[0].pos) && !StarSpots.includes(finalPlot[0].pos)) {
        const enemyPiece = finalPlot.find(piece => piece.id[0] !== id[0])
        const enemyId = enemyPiece.id[0]
        let no = enemyId == 'A' ? 1 : enemyId == 'B' ? 2 : enemyId == 'C' ? 3 : 4;

        let backwardPath = startingPoints[no - 1];
        let i = enemyPiece.pos;
        playSound('collide');

        while (i !== backwardPath) {
            dispatch(updatePlayerPiceValue({
                playerNo: `player${no}`,
                pieceId: enemyPiece.id,
                pos: i,
                travelCount: 0,
            }),
            );

            await delay(0.4)
            i--;
            if (i == 0) {
                i = 52
            }
        }

        dispatch(updatePlayerPiceValue({
            playerNo: `player${no}`,
            pieceId: enemyPiece.id,
            pos: 0,
            travelCount: 0,
        }),
        );
        dispatch(unfreezeDice());
        return;
    }



};