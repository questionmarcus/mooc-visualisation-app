import React, { Component } from "react";
import LinesOfCodePerUser from "./LinesOfCodePerUser.js";
import CoursePath from "./CoursePath.js";
import YearSelect from "../components/YearSelect.js";
import FigureSelect from "../components/FigureSelect.js";
import CalendarView from "../containers/Calendar.js";
import "../styles/MainLayout.css";
import "../styles/FigDisplay.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedYear:2016,
            availableYears:[2016,2017,"All"],
            selectedFig: 0,
            availableFigs:[
                {name: "Learning Path", id: 0},
                {name: "Number of Lines of Haskell Written", id: 1},
                {name: "MOOC Timeline", id: 2}
            ]
        };
        this.updateYear = this.updateYear.bind(this);
        this.updateFig = this.updateFig.bind(this);
        this.Fig2Display = this.Fig2Display.bind(this);
    }

    updateYear(year) {
        this.setState({selectedYear: year});
    }

    updateFig(id) {
        this.setState({selectedFig:id});
    }

    Fig2Display() {
        switch (this.state.selectedFig) {
        case 0:
            return <CoursePath year={this.state.selectedYear}/>;
        case 1:
            return <LinesOfCodePerUser year={this.state.selectedYear} />;
        case 2:
            return <CalendarView year={this.state.selectedYear} />;
        default:
            return <div>Something Went Wrong... :(</div>;
        }
    }

    render() {
        return (
            <div className="App">
                <YearSelect
                    selYear={this.state.selectedYear}
                    availYears={this.state.availableYears}
                    updateMethod={this.updateYear}
                />
                <FigureSelect 
                    selFig={this.state.selectedFig}
                    availFigs={this.state.availableFigs}
                    updateMethod={this.updateFig}
                />
                <div className="fig-display">
                    {this.Fig2Display()}
                </div>
            </div>
        );
    }
}

export default App;
