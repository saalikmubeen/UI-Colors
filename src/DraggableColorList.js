import React, { Component } from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import DraggableColorBox from "./DraggableColorBox";

class DraggableColorList extends Component {
    render() {
        var {colors, removeColor} = this.props;
        return (
            <div style={{width: "100%", height: "100%"}}>
                {colors.map((color, idx) => {
                return <DraggableColorBox background={color.color} colorName={color.name} removeColor={removeColor} key={color.name} index={idx}/>
            })}
            </div>
        );
    }
}

export default SortableContainer(DraggableColorList);