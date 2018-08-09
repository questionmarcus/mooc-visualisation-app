import React, {Component} from "react";
import SankeyTag from "./SankeyTag.js";

class SankeyNode extends Component {
    render() {
        const width = this.props.settings.x1 - this.props.settings.x0;
        const height = this.props.settings.y1 - this.props.settings.y0;
        return (
            <g className="nodes">
                <rect
                    width={width}
                    height={height}
                    fontSize="16"
                    transform={
                        "translate("+this.props.settings.x0+","+this.props.settings.y0+")"
                    }
                ><title>{this.props.settings.name}</title></rect>
                <SankeyTag
                    align={this.props.settings.x1 < this.props.figWidth ?
                        "start" : "end" }
                    xPos={this.props.settings.x1 < this.props.figWidth ?
                        this.props.settings.x1 + 10 : this.props.settings.x0 - 10}
                    yPos={this.props.figHeight/2}
                    name={this.props.settings.name}
                />
            </g>
        );
    }
}

export default SankeyNode;
