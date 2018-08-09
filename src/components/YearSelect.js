import React, {Component} from "react";
import "../styles/YearSelect.css";

class YearSelect extends Component {
    render() {
        return (
            <div className="year-picker">
                {this.props.availYears.map(year => 
                    year===this.props.selYear ?
                        <button
                            className="active"
                            onClick={() => this.props.updateMethod(year)}
                            key={"id-"+year}>
                            {year}
                        </button> :
                        <button onClick={() => this.props.updateMethod(year)}
                            key={"id-"+year}>
                            {year}
                        </button>
                )}
            </div>
        );
    }
}

export default YearSelect;
