import React, { Component } from 'react'
import {withStyles} from "@material-ui/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableElement} from 'react-sortable-hoc';
import chroma from 'chroma-js';

var styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-6px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.3)"
        },
        "@media screen and (max-width: 1200px)": {
            width: "25%",
            height: "20%"
        },
        "@media screen and (max-width: 900px)": {
            width: "50%",
            height: "10%"
        },
        "@media screen and (max-width: 768px)": {
            width: "100%",
            height: "5%"
        }
    },

    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: (props) => chroma(props.background).luminance() <=0.08
                          ? "rgba(225, 225, 225, 0.9)" : "rgba(0, 0, 0, 0.6)",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between"
      },

      deleteIcon: {
          transition: "all 0.3s ease-in-out"
      }
}


class DraggableColorBox extends Component {

    handleClick = () => {
        this.props.removeColor(this.props.colorName);
    }

    render(){
        var {classes, background, colorName} = this.props;
        return (
            <div className={classes.root} style={{backgroundColor: background}}>
                 <div className={classes.boxContent}>
                        <span>{colorName}</span>
                        <DeleteIcon className={classes.deleteIcon} onClick={this.handleClick}/>
                     </div>
            </div>
        )
    }
}

export default SortableElement(withStyles(styles)(DraggableColorBox));