import React, { Component } from 'react'
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Link} from "react-router-dom";
import {withStyles, withTheme} from "@material-ui/styles";
import NewColorPaletteDialog from "./NewColorPaletteDialog";

const styles = {
    navButtons: {
        display: "flex",
        alignItems: "center"
    }
}


class NewColorPaletteNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            paletteName: ""
        }
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(evt){
        this.setState({[evt.target.name]: evt.target.value})
    }

    // componentDidMount(){
      
    //     ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
    //         return this.props.paletteList.every((palette) => {
    //             return palette.paletteName !== value.toLowerCase();
    //         })
    //     });
    // }

    render() {
        var {classes, open, handleDrawerOpen, addPalette, paletteList} = this.props;
        var {paletteName} = this.state;
        return (
        
            
          <AppBar
          position='fixed'
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
          >
          <Toolbar disableGutters={!open}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
                Create A Palette
            </Typography>

          </Toolbar>

        <div className={classes.navButtons}>

            <NewColorPaletteDialog paletteList={paletteList} addPalette={addPalette}/>

            <Button variant="contained" color="secondary">
                 <Link to="/">Go Back</Link>
            </Button>

        </div>    

          </AppBar>
        
        )
    }
}

export default withStyles(styles) (NewColorPaletteNav);
