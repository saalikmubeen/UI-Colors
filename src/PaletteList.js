import React, { Component } from 'react';
import {Link} from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { withStyles } from '@material-ui/core/styles';
import bg from "./bg.svg";
import {CSSTransition, TransitionGroup,} from 'react-transition-group';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import {red} from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

var styles = {
    root: {
        /* background by SVGBackgrounds.com */
        backgroundColor: "#394bad",
        backgroundImage: `url(${bg})`,
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflow: "scroll",
    },

    container: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "wrap",

      "@media screen and (max-width: 1600px)": {
          width: "80%"
      },

      "@media screen and (max-width: 576px)": {
         width: "65%"
     }
    },

    miniPalettes: {
         boxSizing: "border-box",
         width: "100%",
         display: "grid",
         gridTemplateColumns: "repeat(3, 30%)",
         gridGap: "2rem",

         "@media screen and (max-width: 900px)": {
            gridTemplateColumns: "repeat(2, 50%)",
            gridGap: "1.5rem"
         },

         "@media screen and (max-width: 576px)": {
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "1rem"
         }
    },

    nav: {
         display: "flex",
         justifyContent: "space-between",
         alignItems: "center",
         width: "100%",
         color: "white",
         "& a": {
             color: "white"
         }
    },

    heading: {
        fontSize: "2rem"
    },

    "@global": {
        ".fade-exit": {
            opacity: 1
        },
        ".fade-exit-active": {
            opacity: 0,
            transform: "scale(0.9)",
            transition: "all 500ms ease-in-out"
        }
    }

}

class PaletteList extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            paletteId: ""
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.deletePalette = this.deletePalette.bind(this);
    }

    handleClose(){
        this.setState({open: false, paletteId: ""});
    }

    handleOpen(id){
        this.setState({open: true, paletteId: id});
    }

    deletePalette(){
       this.props.deletePalette(this.state.paletteId);
       this.handleClose();
    }


    render() {
        var {paletteList, classes, history} = this.props; 
        var {open} = this.state;

        return (
            <div className={classes.root}>
              <div className={classes.container}>
                  <nav className={classes.nav}>
                      <h1 className={classes.heading}>React Colors</h1>
                      <Link to="/palette/new">Create Palette</Link>
                  </nav>
                  <TransitionGroup className={classes.miniPalettes}>
                       {paletteList.map((palette) => {
                          return <CSSTransition key={palette.paletteName} timeout={500} classNames="fade">
                                     <MiniPalette {...palette} key={palette.paletteName} history={history}
                                       //deletePalette={deletePalette} 
                                        openDialog={this.handleOpen}/>
                                 </CSSTransition>
                       })}
                  </TransitionGroup>
             </div>
             
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Delete This Palette?</DialogTitle>

           <List>

            <ListItem autoFocus button onClick={this.deletePalette}>
            <ListItemAvatar>
              <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
           </ListItem>

          <ListItem autoFocus button onClick={this.handleClose}>
          <ListItemAvatar>
            <Avatar style={{backgroundColor: red[100], color: red[600]}}>
              <CloseIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Cancel" />
          </ListItem>

          </List>
    </Dialog>

    </div>
    );
    }
}

export default withStyles(styles)(PaletteList);