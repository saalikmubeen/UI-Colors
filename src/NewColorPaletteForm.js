import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from '@material-ui/core/Button';
import arrayMove from 'array-move';
import DraggableColorList from "./DraggableColorList";
import NewColorPaletteNav from "./NewColorPaletteNav";
import ColorPickerForm from "./ColorPickerForm";

const drawerWidth = 350;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
    width: "100%"
  },
  content: {
    height: "calc(100vh - 64px)",
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  drawerContainer: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  drawerButtons: {
    width: "100%",
    "& Button": {
      width: "50%"
    }
  }
});

class NewColorPaletteForm extends Component {
    static defaultProps = {
      maxColors: 20
    }
    constructor(props){
        super(props);
        this.state = {
            open: false,
            background: "teal",
            colors: props.paletteList[0].colors,
            colorName: "",
            paletteName: ""
        }

        this.addColor = this.addColor.bind(this);
        this.addPalette = this.addPalette.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
        this.generateRandomColor = this.generateRandomColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
    }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };


  addColor(color, colorName){
       if(this.state.colors.length < this.props.maxColors){
          this.setState({colors: [...this.state.colors, {color: color, name: colorName}]});
      }
  }

  async addPalette(paletteName, emoji){
      var id = paletteName.toLowerCase().replace(/ /g, "-");
      var colors = this.state.colors;
      var newPalette = {paletteName: paletteName, id: id, colors: colors, emoji: emoji};

       await this.props.addPalette(newPalette);
       this.props.history.push("/");
  }

  removeColor(colorName){
      var updatedColors = this.state.colors.filter(function(color){
            return color.name !== colorName;
      })

      this.setState({colors: updatedColors});
  }

  generateRandomColor(){
     var allColors = this.props.paletteList.map(function(palette){
          return palette.colors;
     }).flat();
      var randIdx = Math.floor(Math.random() * allColors.length);
      var randColor = allColors[randIdx];

      if (this.state.colors.length < this.props.maxColors){
        this.setState({colors: [...this.state.colors, randColor]});
      }
  }

  clearPalette(){
    this.setState({colors: []});
  }

   onSortEnd({oldIndex, newIndex}){
   this.setState(function(currState){
      return {colors: arrayMove(currState.colors, oldIndex, newIndex)}
   })
  };

  render() {
    const { classes, maxColors, paletteList } = this.props;
    const { open, colors} = this.state;
    var paletteIsFull = colors.length >= maxColors;

    return (
      
      <div className={classes.root}>
        
        <CssBaseline/>
        <NewColorPaletteNav addPalette={this.addPalette} colors={colors} paletteList={paletteList} handleDrawerOpen={this.handleDrawerOpen} open={open}/>

        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
         >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />

        <div className={classes.drawerContainer}>
           <Typography variant="h4" gutterBottom>Design Your Palette</Typography>
           <div className={classes.drawerButtons}>
           <Button variant="contained" color="secondary" onClick={this.clearPalette}>CLEAR PALETTE</Button>
           <Button variant="contained" color="primary" onClick={this.generateRandomColor} disabled={paletteIsFull}>
              {paletteIsFull ? "FULL PALETTE" : "RANDOM COLOR"}</Button>
           </div>

           <ColorPickerForm paletteIsFull={paletteIsFull} addColor={this.addColor} colors={colors}/>
        </div>

        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
          onSortEnd={this.onSortEnd}
        >
          <div className={classes.drawerHeader} />
            
          <DraggableColorList colors={colors} removeColor={this.removeColor} onSortEnd={this.onSortEnd} axis="xy"/>

        </main>
      </div>
    
    );
  }
}

export default withStyles(styles, { withTheme: true }) (NewColorPaletteForm);