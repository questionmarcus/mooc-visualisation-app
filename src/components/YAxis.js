import React, { Component } from "react";
import { axisLeft } from "d3-axis";
import { select } from "d3-selection";

class YAxis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsize: props.fontsize,
            transform: props.transform,
            scale: props.scale
        };
    }

    componentDidMount() {
        this.renderAxis(); 
    }

    componentDidUpdate() {
        this.renderAxis(); 
    }

    renderAxis() {
        const node = this.refs.yaxis;
        const axis = axisLeft(this.state.scale);
        select(node).call(axis).selectAll("text").style("font-size", "12px");
    }
  
    render() {
        return <g className="axis y-axis"
            ref="yaxis"
            transform={this.state.transform}
            fontSize={this.state.fontsize+"px"}></g>;
    }
}

export default YAxis;
