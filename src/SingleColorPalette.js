import React, { Component } from 'react';
import ColorBox from "./ColorBox";
import NavBar from "./NavBar";
import Footer from "./Footer";
import {Link} from 'react-router-dom';


class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this._shades = this.generateIndividualShades(props.palette, props.match.params.colorId);
        this.state = {
            format: "hex"
        }
        this.changeFormat = this.changeFormat.bind(this);
    }

    generateIndividualShades(palette, colorId){
        var shades = [];
        for(var key in palette.colors){
            shades.push(palette.colors[key].find(function(color){
                return color.id === colorId;
            }))
        }
        return shades.splice(1);
    }

    changeFormat(newFormat){
        this.setState({format: newFormat});
    }

    render() {
        var shades = this._shades.map((shade) => {
            return <ColorBox background={shade[this.state.format]} name={shade.name} showSeeMore={false} key={shade.name}/>
        })
        return (
            <div className="Palette SingleColorPalette">

                <NavBar changeFormat={this.changeFormat} showSlider={false}/>
                <div className="Palette-colorBoxes">
                    {shades}
                    <div className="ColorBox" style={{background: "black"}}>
                        <Link to={`/palette/${this.props.palette.id}`} className="copy-button see-more-button">Go Back</Link>
                    </div>
                </div>
                <Footer palette={this.props.palette}/>
            </div>
        )
    }
}

export default SingleColorPalette;
