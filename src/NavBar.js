import React, { Component } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "./NavBar.css";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from "react-router-dom";


class NavBar extends Component {
    constructor(props){
        super(props);
            this.state = {
                format: "hex",
                open: false
            }
            this.handleChange = this.handleChange.bind(this);
            this.handleClose = this.handleClose.bind(this);
    }

    handleChange(event){
        this.setState({format: event.target.value, open: true});
        this.props.changeFormat(event.target.value);
    }

    handleClose(){
        this.setState({open: false});
    }

    render() {
        return (
            <header className="NavBar">
                <div className="logo">
                    <Link to="/">ReactColorPicker</Link>
                </div>
            { this.props.showSlider &&    
                <div className="slider-container">
                    <span>Level: {this.props.level}</span>
                    <div className="slider">
                     <Slider min={100} max={900} step={100}
                              defaultValue={this.props.level} 
                              onAfterChange={this.props.changeLevel}/>
                    </div>
                </div>
            }   
                <div className="NavBar-dropdown">
                    <Select value={this.state.format} onChange={this.handleChange}>
                        <MenuItem value="hex">HEX- #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB- rgb(225, 225, 225)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(225, 225, 225, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal:"left" }}
                autoHideDuration={3000}
                open={this.state.open}
                message={`Format Changed To ${this.state.format.toUpperCase()}!`}
                onClose={this.handleClose}
                action=
                       {<IconButton onClick={this.handleClose} color="inherit" aria-label="close" key="close">
                          <CloseIcon/>
                        </IconButton>}> 
                </Snackbar>
            </header>
        )
    }
}

export default NavBar;
