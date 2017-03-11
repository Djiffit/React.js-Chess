import dispatcher from "../dispatcher";

export function movePiece(sX, sY, eX, eY) {
    dispatcher.dispatch({
        type: "MOVE_PIECE",
        sX: sX,
        sY: sY,
        eX: eX,
        eY: eY,
    });
}

export function newGame() {
    dispatcher.dispatch({
        type: "NEW_GAME",
    })
}

export function passedPawn(pawn, black) {
    dispatcher.dispatch({
        type: "PASSED_PAWN",
        pawn: pawn,
        black: black
    })
}

export function declareWinner() {
    dispatcher.dispatch({
        type: "NEW_GAME",
    })
}