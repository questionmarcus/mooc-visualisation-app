import React, {Component} from "react";

class SankeyTag extends Component {
    render() {
        return(
            <text
                textAnchor={this.props.align}
                x={this.props.xPos}
                y={this.props.yPos} >
                {this.props.name}
            </text>
        );
    }
}

export default SankeyTag;
