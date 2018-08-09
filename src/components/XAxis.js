import React, { Component } from "react";
import { axisBottom } from "d3-axis";
import { select } from "d3-selection";

class XAxis extends Component {
    componentDidMount() {
        this.renderAxis();
    }

    componentDidUpdate() {
        this.renderAxis();
    }

    renderAxis() {
        const node = this.refs.xaxis;
        const axis = axisBottom(this.props.scale);
        select(node).call(axis).selectAll("text").style("font-size", "12px");
    }

    render() {
        return(
            <g className="axis x-axis"
                ref="xaxis"
                transform={this.props.transform}></g>
        );
    }
}

export default XAxis;
