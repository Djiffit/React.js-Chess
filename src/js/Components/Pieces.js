import React, {Component} from 'react';
import Board from './Board';
import Timer from './Timer';
import PieceStore from "../Stores/PieceStore";
import Title from "./Title";
import State from "./State";
import * as MovePieceActions from "../Actions/MovePieceActions";

export default class Pieces extends Component {
    constructor() {
        super();
        this.state = {
            pieces:PieceStore.getAll(),
            black: false,
            winner: null,
            blackTime: 60.0,
            whiteTime: 60.0
        };
    }

    componentWillMount() {
        PieceStore.on("move", (winner) => {
            this.state.black = !this.state.black;
            if (!this.state.black) {
                this.setState({
                    pieces: PieceStore.getAll(),
                    black: this.state.black,
                    winner: winner,
                    blackTime: this.state.blackTime + 3,
                    whiteTime: this.state.whiteTime
                });
            } else {
                this.setState({pieces: PieceStore.getAll(),
                    black: this.state.black,
                    winner: winner,
                    blackTime: this.state.blackTime,
                    whiteTime: this.state.whiteTime+3
                });
            }
        });

        PieceStore.on("win", (black) =>{
            console.log("WON", black);
            this.setState({pieces: PieceStore.getAll(),
                black: this.state.black,
                winner: black,
                blackTime: this.state.blackTime,
                whiteTime: this.state.whiteTime+3
            });
        });

        PieceStore.on("refresh", (pawn, black) =>{
            this.setState({pieces: PieceStore.getAll(),
                black: this.state.black,
                winner: this.state.winner,
                blackTime: this.state.blackTime,
                whiteTime: this.state.whiteTime
            });
        });
    }

    componentWillUnmount () {
        clearInterval(this.timer);
        this.timer = null;
    }

    updateTime(reduce) {
        if (this.state.winner == null) {
            if (this.state.black) {
                this.setState({
                    pieces: PieceStore.getAll(),
                    black: this.state.black,
                    winner: this.state.winner,
                    blackTime: (this.state.blackTime - reduce),
                    whiteTime: this.state.whiteTime
                });
            } else {
                this.setState({
                    pieces: PieceStore.getAll(),
                    black: this.state.black,
                    winner: this.state.winner,
                    blackTime: this.state.blackTime,
                    whiteTime: (this.state.whiteTime - reduce)
                });
            }
        }
    }

    render() {
        console.log(this.state.winner)
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
                        <Board won={this.state.winner} black={this.state.black} piecePositions={this.state.pieces}/>
                    </div>
                    <div className="col-xs-3">
                        <State winner={this.state.winner}/>
                    </div>
                </div>
            </div>
        );
    }
}

