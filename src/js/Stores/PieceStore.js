import React, {Component} from 'react';
import dispatcher from "../dispatcher";
import { EventEmitter } from "events";
import * as MovePieceActions from "../Actions/MovePieceActions";

class PieceStore extends EventEmitter {
    constructor() {
        super();
        this.state = {
            white: [
                {
                    name: 'Pawn',
                    x: 0,
                    y: 6,
                },
                {
                    name: 'Pawn',
                    x: 1,
                    y: 6,
                },
                {
                    name: 'Pawn',
                    x: 2,
                    y: 6,
                },
                {
                    name: 'Pawn',
                    x: 3,
                    y: 6,
                },
                {
                    name: 'Pawn',
                    x: 4,
                    y: 6,
                },
                {
                    name: 'Pawn',
                    x: 5,
                    y: 6,
                },
                {
                    name: 'Pawn',
                    x: 6,
                    y: 6,
                },
                {
                    name: 'Pawn',
                    x: 7,
                    y: 6,
                },
                {
                    name: 'Rook',
                    x: 0,
                    y: 7,
                },
                {
                    name: 'Knight',
                    x: 1,
                    y: 7,
                },
                {
                    name: 'Bishop',
                    x: 2,
                    y: 7,
                },
                {
                    name: 'Queen',
                    x: 3,
                    y: 7,
                },
                {
                    name: 'King',
                    x: 4,
                    y: 7,
                },
                {
                    name: 'Bishop',
                    x: 5,
                    y: 7,
                },
                {
                    name: 'Knight',
                    x: 6,
                    y: 7,
                },
                {
                    name: 'Rook',
                    x: 7,
                    y: 7,
                },
            ],
            black: [
                {
                    name: 'Pawn',
                    x: 0,
                    y: 1,
                },
                {
                    name: 'Pawn',
                    x: 1,
                    y: 1,
                },
                {
                    name: 'Pawn',
                    x: 2,
                    y: 1,
                },
                {
                    name: 'Pawn',
                    x: 3,
                    y: 1,
                },
                {
                    name: 'Pawn',
                    x: 4,
                    y: 1,
                },
                {
                    name: 'Pawn',
                    x: 5,
                    y: 1,
                },
                {
                    name: 'Pawn',
                    x: 6,
                    y: 1,
                },
                {
                    name: 'Pawn',
                    x: 7,
                    y: 1,
                },
                {
                    name: 'Rook',
                    x: 0,
                    y: 0,
                },
                {
                    name: 'Knight',
                    x: 1,
                    y: 0,
                },
                {
                    name: 'Bishop',
                    x: 2,
                    y: 0,
                },
                {
                    name: 'Queen',
                    x: 3,
                    y: 0,
                },
                {
                    name: 'King',
                    x: 4,
                    y: 0,
                },
                {
                    name: 'Bishop',
                    x: 5,
                    y: 0,
                },
                {
                    name: 'Knight',
                    x: 6,
                    y: 0,
                },
                {
                    name: 'Rook',
                    x: 7,
                    y: 0,
                },
            ]
        }

    }

    movePiece(sX, sY, eX, eY) {
        var indexToRemove = null;
        var indexToUpdate = null;
        let black = true;

        for (var j = 0; j < this.state.white.length; ++j) {
            if (sX === this.state.white[j].x && sY === this.state.white[j].y) {
                indexToUpdate = j;
            }
            if (eX === this.state.white[j].x && eY === this.state.white[j].y) {
                indexToRemove = j;
            }
        }
        if (indexToUpdate != null) {
            this.state.white[indexToUpdate].x = eX;
            this.state.white[indexToUpdate].y = eY;
            if (this.state.white[indexToUpdate].name == 'Pawn' && eY == 0)  this.state.white[indexToUpdate].name = 'Queen';
            black = false;
        }
        if (indexToRemove != null) {
            if (this.state.white[indexToRemove].name == 'King') this.emit("win", 'black');
            this.state.white[indexToRemove].x = -50;
            this.state.white[indexToRemove].y = -50;
        }
        //this.state.white.splice(indexToRemove, 1);


        indexToRemove = null;
        indexToUpdate = null;
        for (var j = 0; j < this.state.black.length; ++j) {
            if (sX === this.state.black[j].x && sY === this.state.black[j].y) {
                indexToUpdate = j;
            }
            if (eX === this.state.black[j].x && eY === this.state.black[j].y) {
                indexToRemove = j;
            }
        }
        if (indexToUpdate != null) {
            this.state.black[indexToUpdate].x = eX;
            this.state.black[indexToUpdate].y = eY;
            if (this.state.black[indexToUpdate].name == 'Pawn' && eY == 7) this.state.black[indexToUpdate].name = 'Queen';
        }
        if (indexToRemove != null) {
            if (this.state.white[indexToRemove].name == 'King') this.emit("win", 'white');
            this.state.black[indexToRemove].x = -50;
            this.state.black[indexToRemove].y = -50;
        }
        //this.state.black.splice(indexToRemove, 1);
        this.emit("move");
    }
    getAll() {
        return this.state;
    }

    handleActions(action) {
        switch(action.type) {
            case "MOVE_PIECE": {
                this.movePiece(action.sX, action.sY, action.eX, action.eY);
                break;
            }
        }
    }
}
const pieceStore = new PieceStore;
dispatcher.register(pieceStore.handleActions.bind(pieceStore));
export default pieceStore;