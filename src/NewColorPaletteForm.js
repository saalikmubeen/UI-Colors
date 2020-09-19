import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {ChromePicker} from "react-color";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import arrayMove from 'array-move';
import DraggableColorList from "./DraggableColorList";

const drawerWidth = 350;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    height: "calc(100vh - 64px)",
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
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
  }
});

class NewColorPaletteForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            background: "teal",
            colors: props.paletteList[0].colors,
            colorName: "",
            paletteName: ""
        }
        this.handleColorChange = this.handleColorChange.bind(this);
        this.addColor = this.addColor.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
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

  handleColorChange(newColor){
      this.setState({background: newColor.hex})
  }

  handleTextChange(evt){
    this.setState({[evt.target.name]: evt.target.value})
}

  addColor(){
      this.setState({colors: [...this.state.colors, {color: this.state.background, name: this.state.colorName}], colorName: ""});
  }

  async addPalette(){
      var paletteName = this.state.paletteName;
      var id = paletteName.toLowerCase().replace(/ /g, "-");
      var colors = this.state.colors;
      var newPalette = {paletteName: paletteName, id: id, colors: colors, emoji: ""};

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
      this.setState({colors: [...this.state.colors, randColor]});
  }

  clearPalette(){
    this.setState({colors: []});
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
         return this.state.colors.every(function(color){
             return color.name.toLowerCase() !== value.toLowerCase();
         })
    });

    ValidatorForm.addValidationRule('isColorUnique', (value) => {
      return this.state.colors.every((color) => {
          return color.color !== this.state.background;
      })
    });

    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      return this.props.paletteList.every((palette) => {
          return palette.paletteName !== value.toLowerCase();
      })
    });
}

onSortEnd({oldIndex, newIndex}){
   this.setState(function(currState){
      return {colors: arrayMove(currState.colors, oldIndex, newIndex)}
   })
};

  render() {
    const { classes } = this.props;
    const { open, background, colors, colorName, paletteName } = this.state;

    return (
      
      <div className={classes.root}>
        <CssBaseline />
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
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
                Create A Palette
            </Typography>

            <ValidatorForm
                ref="form"
                onSubmit={this.addPalette}
                onError={errors => console.log(errors)}
            >
            <TextValidator
                label="Palette Name"
                onChange={this.handleTextChange}
                name="paletteName"
                value={paletteName}
                    validators={['required', 'isPaletteNameUnique']}
                errorMessages={['this field is required', 'Palette with that name already exists']}
            />
                 <Button variant="contained" color="primary" 
                    type="submit">SAVE PALETTE</Button>
            </ValidatorForm>

          </Toolbar>
        </AppBar>

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

           <Typography variant="h4">Design Your Palette</Typography>
           <div>
           <Button variant="contained" color="secondary" onClick={this.clearPalette}>CLEAR PALETTE</Button>
           <Button variant="contained" color="primary" onClick={this.generateRandomColor}>RANDOM COLOR</Button>
           </div>

          <ChromePicker color={background} onChangeComplete={this.handleColorChange}/>

            <ValidatorForm
                ref="form"
                onSubmit={this.addColor}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    label="Color Name"
                    onChange={this.handleTextChange}
                    name="colorName"
                    value={colorName}
                    validators={['required', 'isColorNameUnique', 'isColorUnique']}
                    errorMessages={['this field is required', 'Color with that color name already exists', 'Color already exists']}
                />
                 <Button variant="contained" color="primary" 
                    style={{backgroundColor: background}} type="submit">ADD COLOR</Button>
            </ValidatorForm>
         
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