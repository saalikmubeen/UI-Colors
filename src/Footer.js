import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
         <footer className="Palette-footer">
            {this.props.palette.paletteName}
            <span className="Palette-emoji">{this.props.palette.emoji}</span>
         </footer>
        )
    }
}

export default Footer;