import React, { Component } from 'react';
import {Link} from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { withStyles } from '@material-ui/core/styles';

var styles = {
    root: {
        backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },

    container: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flexWrap: "wrap"
    },

    miniPalettes: {
         boxSizing: "border-box",
         width: "100%",
         display: "grid",
         gridTemplateColumns: "repeat(3, 30%)",
         gridGap: "5%" 
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
    }

}

class PaletteList extends Component {
    render() {
        var {paletteList, classes, history, deletePalette} = this.props; 
        
        return (
            <div className={classes.root}>
              <div className={classes.container}>
                  <nav className={classes.nav}>
                      <h1>ReactColors</h1>
                      <Link to="/palette/new">Create Palette</Link>
                  </nav>
                  <div className={classes.miniPalettes}>
                       {paletteList.map(function(palette){
                          return <MiniPalette {...palette} key={palette.paletteName} history={history} deletePalette={deletePalette}/>
                       })}
                  </div>
             </div>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);