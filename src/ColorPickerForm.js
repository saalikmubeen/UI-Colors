import React, { Component } from 'react';
import {ChromePicker} from "react-color";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class ColorPickerForm extends Component {
     constructor(props){
         super(props);
         this.state = {
            background: "teal",
            colorName: "",
         }
         this.handleColorChange = this.handleColorChange.bind(this);
         this.handleTextChange = this.handleTextChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
     }

     handleColorChange(newColor){
        this.setState({background: newColor.hex})
    }
  
    handleTextChange(evt){
      this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit(){
      this.props.addColor(this.state.background, this.state.colorName);

      var rand1 = Math.floor(Math.random() * 225);
      var rand2 = Math.floor(Math.random() * 200);
      var rand3 = Math.floor(Math.random() * 100);
      this.setState({colorName: "", background: `rgb(${rand1}, ${rand2},${rand3})`});
  }

     componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
             return this.props.colors.every(function(color){
                 return color.name.toLowerCase() !== value.toLowerCase();
             })
        });
    
        ValidatorForm.addValidationRule('isColorUnique', (value) => {
          return this.props.colors.every((color) => {
              return color.color !== this.state.background;
          })
        });
    }
    
    render() {
        var {paletteIsFull} = this.props;
        var {background, colorName} = this.state;
        return (
            <div>
                <ChromePicker color={background} onChangeComplete={this.handleColorChange}/>

                  <ValidatorForm
                  ref="form"
                  onSubmit={this.handleSubmit}
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
                      style={{backgroundColor: paletteIsFull ? "grey" : background}} type="submit" disabled={paletteIsFull}>
                          {paletteIsFull ? "FULL PALETTE" : "ADD COLOR"}</Button>
                   </ValidatorForm>
            </div>
        );
    }
}

export default ColorPickerForm;