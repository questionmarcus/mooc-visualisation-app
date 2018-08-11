import React, {Component} from "react";

class CalendarDay extends Component {
    render() {
        return (
            <rect
                fill={this.props.colour}
                width={this.props.size}
                height={this.props.size}
                x={this.props.xPos}
                y={this.props.yPos}>
                <title>{this.props.day+"\n"+this.props.value+" Active Users"}</title>
            </rect>
        );
    }
}

export default CalendarDay;
