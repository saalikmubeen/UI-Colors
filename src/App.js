import React, {Component} from 'react';
import seedColors from "./seedColors";
import Palette from "./Palette";
import {generateColorPalette} from "./colorHelper";
import {Route, Switch, withRouter} from 'react-router-dom';
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewColorPaletteForm from "./NewColorPaletteForm";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "./App.css";


class App extends Component{
    constructor(props){
      super(props);
      this.state = {
          paletteList: JSON.parse(window.localStorage.getItem("paletteList")) || seedColors
      }

      this.addPalette = this.addPalette.bind(this);
      this.deletePalette = this.deletePalette.bind(this);
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

  deletePalette(paletteId){
     this.setState({paletteList: this.state.paletteList.filter((palette) => palette.id !== paletteId)}, function(){
        this.syncLocalStorage();
     });
  }

  syncLocalStorage(){
    window.localStorage.setItem("paletteList", JSON.stringify(this.state.paletteList));
  }

  render(){
     var {paletteList} = this.state;
     var {location} = this.props;
    return(
      <TransitionGroup>
        <CSSTransition timeout={500} classNames="slide" key={location.key}>
        <Switch location={location}>
          
          <Route exact path="/" render={(routeProps) =>
                      <div className="page">
                         <PaletteList paletteList={paletteList}
                            deletePalette={this.deletePalette} {...routeProps}/> 
                      </div>}/>

          <Route exact path="/palette/new" render={(routeProps) =>
                       <div className="page">
                          <NewColorPaletteForm
                             addPalette={this.addPalette} paletteList={paletteList} {...routeProps}/>
                        </div>}/>

          <Route exact path="/palette/:id" render={(routeProps) => 
                       <div className="page">
                          <Palette 
                             palette={generateColorPalette(this.searchPalette(routeProps.match.params.id))}/>
                        </div>}/>
                 
          <Route exact path="/palette/:paletteId/:colorId" render={(routeProps) => 
                       <div className="page"> 
                           <SingleColorPalette
                              palette={generateColorPalette(this.searchPalette(routeProps.match.params.paletteId))}
                               {...routeProps}/>
                        </div>}/>

          <Route render={(routeProps) =>
                       <div className="page"> 
                           <PaletteList paletteList={paletteList} deletePalette={this.deletePalette} {...routeProps}/> 
                      </div>}/>

        </Switch>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

export default withRouter(App);
