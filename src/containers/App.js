import React, { Component } from "react";
//import LinesOfCodePerUser from "./LinesOfCodePerUser.js";
import CoursePath from "./CoursePath.js";
import YearSelect from "../components/YearSelect.js";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedYear:2016,
            availableYears:[2016,2017]
        };
        this.updateYear = this.updateYear.bind(this);
    }

    updateYear(year) {
        this.setState({selectedYear: year});
    }

    render() {
        return (
            <div className="App">
                <YearSelect
                    selYear={this.state.selectedYear}
                    availYears={this.state.availableYears}
                    updateMethod={this.updateYear}
                />
                <CoursePath year={this.state.selectedYear}/>
            </div>
        );
    }
}

export default App;
