import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class NewColorPaletteDialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: true,
            paletteName: "",
            emojiVisible: false
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addEmoji = this.addEmoji.bind(this);
    }
    
    handleOpen(){
        this.setState({open: true});
    }

    handleClose(){
        this.setState({open: false, emojiVisible: false});
    }

    handleTextChange(evt){
        this.setState({[evt.target.name]: evt.target.value})
    }

    handleSubmit(){
        this.setState({emojiVisible: true});
        // this.props.addPalette(this.state.paletteName);
    }

    // adds emoji and saves the palette
    addEmoji(emoji){
        this.props.addPalette(this.state.paletteName, emoji.native);
    }

    componentDidMount(){
      
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            return this.props.paletteList.every((palette) => {
                return palette.paletteName.toLowerCase() !== value.toLowerCase();
            })
        });
    }

    render() {
        var {open, paletteName, emojiVisible} = this.state;
        return (
            <div>
            
            <Dialog open={emojiVisible} onClose={this.handleClose}> 
              <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
               <Picker set="apple" onSelect={this.addEmoji} title="Choose an Emoji"/>
            </Dialog>
            
            <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title"> 

              <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>

              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
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
