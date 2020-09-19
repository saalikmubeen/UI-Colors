import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import "./Palette.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

class Palette extends Component {
    constructor(props){
        super(props);
        this.state = {
            level: 500,
            format: "hex"
        }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(newLevel){
       this.setState({level: newLevel});
    }

    changeFormat(newFormat){
        this.setState({format: newFormat});
    }

    render() {
        var {palette} = this.props
        var colorBoxes = palette.colors[this.state.level].map((color) => {
            return <ColorBox background={color[this.state.format]} name={color.name} key={color.id} paletteId={palette.id} colorId={color.id} showSeeMore={true}/>
        })
        return (
            <div className="Palette">
               <NavBar level={this.state.level} changeLevel={this.changeLevel} changeFormat={this.changeFormat} showSlider={true}/>

                <div className="Palette-colorBoxes">
                    {colorBoxes}
                </div>

                <Footer palette={palette}/>
            </div>
        );
    }
}

export default Palette;