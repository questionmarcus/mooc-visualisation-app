import React, { Component } from "react";
import "../styles/Bar.css";

class Bar extends Component {
    render() {
        const {barWidth, height, offset, maxHeight} = this.props;
        return(
            <rect
                className="bar"
                x={offset}
                y={height}
                width={barWidth}
                height={maxHeight - height}/>
        );
    }
}

export default Bar;
