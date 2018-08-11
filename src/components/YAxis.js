import React, { Component } from "react";
import { axisLeft } from "d3-axis";
import { select } from "d3-selection";

class YAxis extends Component {
    componentDidMount() {
        this.renderAxis(); 
    }

    componentDidUpdate() {
        this.renderAxis(); 
    }

    renderAxis() {
        const node = this.refs.yaxis;
        const axis = axisLeft(this.props.scale);
        select(node).call(axis).selectAll("text").style("font-size", "12px");
    }
  
    render() {
        return <g className="axis y-axis"
            ref="yaxis"
            transform={this.props.transform}
            fontSize={this.props.fontsize+"px"}></g>;
    }
}

export default YAxis;
