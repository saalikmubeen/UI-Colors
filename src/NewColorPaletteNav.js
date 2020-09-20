import React, { Component } from 'react'
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/styles";
import NewColorPaletteDialog from "./NewColorPaletteDialog";

const styles = {
    navButtons: {
        display: "flex",
        alignItems: "center",
        marginRight: "1rem",

        "& Button": {
            margin: "0 0.5rem"
        },

        "& a": {
            textDecoration: "none",
            color: "white",
        }
    }
}


class NewColorPaletteNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            dialogOpen: false
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    handleTextChange(evt){
        this.setState({[evt.target.name]: evt.target.value})
    }

    openDialog(){
        this.setState({dialogOpen: true});
    }

    closeDialog(){
        this.setState({dialogOpen: false});
    }

    render() {
        var {classes, open, handleDrawerOpen, addPalette, paletteList} = this.props;
        var {dialogOpen} = this.state;
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

            {dialogOpen && <NewColorPaletteDialog paletteList={paletteList} addPalette={addPalette} closeDialog={this.closeDialog}/>}

            <Button variant="contained" color="primary" onClick={this.openDialog}>
               Save
            </Button>

            <Button variant="contained" color="secondary">
                 <Link to="/">Go Back</Link>
            </Button>

        </div>    
        
          </AppBar>
        
        )
    }
}

export default withStyles(styles) (NewColorPaletteNav);
