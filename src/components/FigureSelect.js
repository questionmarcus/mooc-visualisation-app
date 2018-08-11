import React, {Component} from "react";
import "../styles/FigSelect.css";

class FigureSelect extends Component {
    render() {
        return (
            <div className="fig-select">
                {this.props.availFigs.map(fig => 
                    fig.id === this.props.selFig ?
                        <button 
                            className="active"
                            onClick={() => this.props.updateMethod(fig.id)}
                            key={fig.id}
                        >
                            {fig.name}
                        </button>
                        :
                        <button 
                            onClick={() => this.props.updateMethod(fig.id)}
                            key={fig.id}
                        >
                            {fig.name}
                        </button>
                )}
            </div>
        );
    }
}

export default FigureSelect;
