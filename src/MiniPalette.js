import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

var styles = {
      root: {
          backgroundColor: "white",
          borderRadius: "5px",
          padding: "0.5rem",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          "&:hover svg": {
              opacity: "1"
          }
      },

      paletteColors: {
        backgroundColor: "#dae1e4",
        width: "100%",
        height: "150px",
        borderRadius: "5px",
        overflow: "hidden"
      },

      paletteName: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0",
          color: "black",
          marginTop: "0.5rem",
          fontSize: "1rem",
          position: "relative"
      },

      emoji: {
          marginLeft: "0.5rem",
          fontSize: "1.5rem"
      },

      miniBox: {
          width: "20%",
          height: "25%",
          display: "inline-block",
          margin: "0 auto",
          position: "relative",
          marginBottom: "-4px"
      },

      deletePaletteBtn: {
          position: "absolute",
          top: "0",
          right: "0",
          backgroundColor: "#eb3d30",
          color: "white",
          height: "20px",
          width: "20px",
          padding: "10px",
          zIndex: "3",
          opacity: "0"
      }

}

class MiniPalette extends Component {

    handleClick= () => {
        this.props.history.push(`/palette/${this.props.id}`);
    }

    deletePalette = (evt) => {
        evt.stopPropagation();
        this.props.deletePalette(this.props.id);
    }

    render() {
        var {classes, colors, emoji, paletteName} = this.props
        return (
            <div className={classes.root} onClick={this.handleClick}>

                <DeleteIcon className={classes.deletePaletteBtn} style={{transition: "all 0.3s ease-in-out"}} onClick={this.deletePalette}/>

                <div className={classes.paletteColors}>
                    {colors.map(function(color){
                        return <div className={classes.miniBox} style={{backgroundColor: color.color}} key={color.name} />
                    })}
                </div>
                <h3 className={classes.paletteName}>{paletteName} <span className={classes.emoji}>{emoji}</span></h3>
            </div>
        );
    }
}

export default withStyles(styles)(MiniPalette);