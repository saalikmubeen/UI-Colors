import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Link} from "react-router-dom";

class NewColorPaletteDialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            paletteName: ""
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }
    
    handleOpen(){
        this.setState({open: true});
    }

    handleClose(){
        this.setState({open: false})
    }

    handleTextChange(evt){
        this.setState({[evt.target.name]: evt.target.value})
    }

    componentDidMount(){
      
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            return this.props.paletteList.every((palette) => {
                return palette.paletteName.toLowerCase() !== value.toLowerCase();
            })
        });
    }

    render() {
        var {open, paletteName} = this.state;
        var {addPalette} = this.props;
        return (
            <div>
            <Button variant="outlined" color="primary" onClick={this.handleOpen}>
               Add Palette
            </Button>
            <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>

              <ValidatorForm
                ref="form"
                onSubmit={() => addPalette(paletteName)}
                onError={errors => console.log(errors)}
               >

              <DialogContent>
                <DialogContentText>
                   Enter a palette name for your newly created palette. Palette name should be unique.
                </DialogContentText>

               <TextValidator
                   label="Palette Name"
                   onChange={this.handleTextChange}
                   name="paletteName"
                   value={paletteName}
                   fullWidth
                   margin="normal"
                     validators={['required', 'isPaletteNameUnique']}
                   errorMessages={['this field is required', 'Palette with that name already exists']}
               />

              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>

                <Button variant="contained" color="primary" 
                    type="submit">SAVE PALETTE</Button>

              </DialogActions>

              </ValidatorForm>

            </Dialog>
          </div>
        )
    }
}


export default NewColorPaletteDialog;
