import React, {Component} from "react";
import "../styles/SankeyLink.css";

class SankeyPath extends Component {
    render() {
        const pathFunc = this.props.pathGen;
        const path = pathFunc(this.props.settings);
        return (
            <path
                fill="none"
                stroke="#000"
                strokeOpacity="0.2"
                d={path}
                strokeWidth={this.props.settings.width}>
                <title>
                    {this.props.settings.source.name} → {this.props.settings.target.name}:
                    {" "+this.props.settings.value}
                </title>
            </path>
        );
    }
}

export default SankeyPath;
