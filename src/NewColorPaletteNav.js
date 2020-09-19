import React, { Component } from 'react'
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
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const drawerWidth = 350;


// const styles = theme => ({
//     root: {
//       display: "flex"
//     },
//     appBar: {
//       transition: theme.transitions.create(["margin", "width"], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//       })
//     },
//     appBarShift: {
//       width: `calc(100% - ${drawerWidth}px)`,
//       marginLeft: drawerWidth,
//       transition: theme.transitions.create(["margin", "width"], {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen
//       })
//     },
//     menuButton: {
//       marginLeft: 12,
//       marginRight: 20
//     },
//     hide: {
//       display: "none"
//     },
//     drawer: {
//       width: drawerWidth,
//       flexShrink: 0
//     },
//     drawerPaper: {
//       width: drawerWidth
//     },
//     drawerHeader: {
//       display: "flex",
//       alignItems: "center",
//       padding: "0 8px",
//       ...theme.mixins.toolbar,
//       justifyContent: "flex-end"
//     },
//     content: {
//       height: "calc(100vh - 64px)",
//       flexGrow: 1,
//       padding: theme.spacing.unit * 3,
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//       }),
//       marginLeft: -drawerWidth
//     },
//     contentShift: {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen
//       }),
//       marginLeft: 0
//     }
// });
  


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

    componentDidMount(){
      
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            return this.props.paletteList.every((palette) => {
                return palette.paletteName !== value.toLowerCase();
            })
        });
    }

    render() {
        var {classes, open, handleDrawerOpen, addPalette} = this.props;
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

            <ValidatorForm
                ref="form"
                onSubmit={() => addPalette(paletteName)}
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
        
        )
    }
}

export default NewColorPaletteNav;
