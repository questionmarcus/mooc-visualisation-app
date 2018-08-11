import React, {Component} from "react";

class CalendarDay extends Component {
    render() {
        return (
            <rect width="20" height="20"
                x={this.props.xPos}
                y={this.props.yPos}>
                <title>{this.props.day}</title>
            </rect>
        );
    }
}

export default CalendarDay;
