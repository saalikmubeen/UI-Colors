import React, { Component } from 'react'
import "./ColorBox.css";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Link} from "react-router-dom";
import chroma from "chroma-js";

class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            copied: false
        }
        this.handleCopy = this.handleCopy.bind(this);
    }

    handleCopy(){
       this.setState({copied: true}, () => {
           setTimeout(() => {
               this.setState({copied: false})
           }, 1500);
       })
    } 

    render() {
        var {background, name, paletteId, colorId, showSeeMore} = this.props;
        var {copied} = this.state;
        var isDarkColor = chroma(background).luminance() <= 0.08;
        var isLightColor = chroma(background).luminance() >= 0.75;
        return (
          <CopyToClipboard text={background} onCopy={this.handleCopy}>   
            <div className="ColorBox" style={{background: background}}>
                <div className={`copy-overlay ${copied && "show"}`} style={{background: background}}></div>
                <div className={`copy-msg ${copied && "show"}`}>
                    <h1 className={isLightColor ? "dark-text": ""}>Copied!</h1>
                    <p className={isLightColor ? "dark-text" : ""}>{background}</p>
                </div>
                <div className="copy-container">
                     <div className="box-content">
                          <span className={isDarkColor ? "light-text": ""}>{name}</span>
                     </div>
                     <button className={`copy-button ${isLightColor && "dark-text"}`}>Copy</button>
                </div>
             { showSeeMore &&
                <Link className={`see-more ${isLightColor && "dark-text"}`} to={`/palette/${paletteId}/${colorId}`} onClick={(e) => e.stopPropagation()}>More</Link>
             }  
            </div>
         </CopyToClipboard>
        )
    }
}

export default ColorBox;