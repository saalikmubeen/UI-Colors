import React, {Component} from 'react';
import seedColors from "./seedColors";
import Palette from "./Palette";
import {generateColorPalette} from "./colorHelper";
import {Route, Switch} from 'react-router-dom';
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewColorPaletteForm from "./NewColorPaletteForm";


class App extends Component{
    constructor(props){
      super(props);
      this.state = {
          paletteList: JSON.parse(window.localStorage.getItem("paletteList")) || seedColors
      }

      this.addPalette = this.addPalette.bind(this);
      this.searchPalette = this.searchPalette.bind(this);
      this.syncLocalStorage = this.syncLocalStorage.bind(this);
    }
  
  searchPalette(paletteId){
    return this.state.paletteList.find(function(seedColor){
          return seedColor.id === paletteId;
    })
  }

  addPalette(newPalette){
    this.setState({paletteList: [...this.state.paletteList, newPalette]}, function(){
          this.syncLocalStorage();
    });
  }

  syncLocalStorage(){
    window.localStorage.setItem("paletteList", JSON.stringify(this.state.paletteList));
  }

  render(){
     var {paletteList} = this.state;
    return(
        <Switch>
          <Route exact path="/" render={(routeProps) => <PaletteList paletteList={paletteList} {...routeProps}/>}/>
          <Route exact path="/palette/new" render={(routeProps) => <NewColorPaletteForm addPalette={this.addPalette} paletteList={paletteList} {...routeProps}/>}/>
          <Route exact path="/palette/:id" render={(routeProps) => <Palette palette={generateColorPalette(this.searchPalette(routeProps.match.params.id))}/>}/>
          <Route exact path="/palette/:paletteId/:colorId" render={(routeProps) => <SingleColorPalette palette={generateColorPalette(this.searchPalette(routeProps.match.params.paletteId))} {...routeProps}/>}/>
        </Switch>
    )
  }
}

export default App;
