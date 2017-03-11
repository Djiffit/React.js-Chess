import React from 'react';

export default class Title extends React.Component {

    render() {
        const player = this.props.black ? 'Black' : 'Red';
        const color = this.props.black ? 'black' : 'red';
        return (
            <div style = {{ display: 'flex',
                justifyContent: 'center',
                paddingTop:'15px'
            }}>
                <h3><b style={{ color: color}}>{player}</b> player's turn!</h3>
            </div>
        )
    }
}