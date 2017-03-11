import React, {Component} from 'react';
import Board from './Board';
import Timer from './Timer';
import PieceStore from "../Stores/PieceStore";
import Title from "./Title";
import * as MovePieceActions from "../Actions/MovePieceActions";


export default class Pieces extends Component {

    constructor() {
        super();
        this.state = {
            pieces:PieceStore.getAll(),
            black: false,
            winner: false,
            blackTime: 60.0,
            whiteTime: 60.0
        };
    }

    componentWillMount() {
        PieceStore.on("move", (pawn, black) => {
            this.state.black = !this.state.black;
            if (!this.state.black) {
                this.setState({
                    pieces: PieceStore.getAll(),
                    black: this.state.black,
                    winner: false,
                    blackTime: this.state.blackTime + 3,
                    whiteTime: this.state.whiteTime
                });
            } else {
                this.setState({pieces: PieceStore.getAll(),
                    black: this.state.black,
                    winner: false,
                    blackTime: this.state.blackTime,
                    whiteTime: this.state.whiteTime+3
                });
            }
        });

        PieceStore.on("win", (pawn, black) =>{
            this.setState({pieces: PieceStore.getAll(),
                black: this.state.black,
                winner: true
            });
        });

        PieceStore.on("refresh", (pawn, black) =>{
            this.setState({pieces: PieceStore.getAll(),
                black: this.state.black,
                winner: false,
                blackTime: this.state.blackTime,
                whiteTime: this.state.whiteTime
            });
        });
    }

    componentWillUnmount () {
        clearInterval(this.timer);
        this.timer = null;
    }

    passedPawn() {
        for (var j = 0; j < this.state.pieces.black.length; ++j) {
            if (7 === this.state.pieces.black[j].y && this.state.pieces.black[j].name === 'Pawn') {
                MovePieceActions.passedPawn(this.state.pieces.black[j], true);
            }
        }
        for (var j = 0; j < this.state.pieces.white.length; ++j) {
            if (0 === this.state.pieces.white[j].y&& this.state.pieces.white[j].name === 'Pawn') {
                MovePieceActions.passedPawn(this.state.pieces.white[j], false);
            }

        }
    }


    updateTime(reduce) {
        if (this.state.black) {
            this.setState({
                pieces: PieceStore.getAll(),
                black: this.state.black,
                winner: false,
                blackTime: (this.state.blackTime - reduce),
                whiteTime: this.state.whiteTime
            });
        } else {
            this.setState({
                pieces: PieceStore.getAll(),
                black: this.state.black,
                winner: false,
                blackTime: this.state.blackTime,
                whiteTime: (this.state.whiteTime - reduce)
            });
        }
    }

    // moveRandom() {
    //     MovePieceActions.movePiece(Math.floor(Math.random() * 8), Math.floor(Math.random() * 8), Math.floor(Math.random() * 8), Math.floor(Math.random() * 8))
    // }

    render() {
        return (
            <div>
                <div className="row">
                    {/*<div>*/}
                    {/*<div style = {{ display: 'flex',*/}
                    {/*justifyContent: 'center',*/}
                    {/*paddingTop:'15px'*/}
                    {/*}}>*/}
                    {/*<button className="btn btn-default btn-sm">Restart</button>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    <div>
                        <Title black={this.state.black} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-3">
                        <Timer blacktime={this.state.blackTime} whitetime={this.state.whiteTime} update={this.updateTime.bind(this)} blackTurn={this.state.black}/>
                    </div>
                    <div style={{
                        display: 'flex',
                        maxHeight: '950px',
                        justifyContent: 'center',
                        cursor: 'crosshair'
                    }} className="App col-xs-6">
                        <Board black={this.state.black} piecePositions={this.state.pieces}/>
                    </div>
                </div>
            </div>
        );
    }
}

