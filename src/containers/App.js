import React, { Component } from "react";
import LinesOfCodePerUser from "./LinesOfCodePerUser.js";
import CoursePath from "./CoursePath.js";
import YearSelect from "../components/YearSelect.js";
import FigureSelect from "../components/FigureSelect.js";
import CalendarView from "./Calendar.js";
import AccessedTutorials from "./AccessedTutorials.js";
import ModalSplashScreen from "../components/ModalSplashScreen.js"
import "../styles/MainLayout.css";
import "../styles/FigDisplay.css";

class App extends Component {
    constructor(props) {
      super(props)
        this.state = {
            showModal:true,
            selectedYear:2016,
            availableYears:[2016,2017,"All"],
            selectedFig: 0,
            availableFigs:[
                {name: "Learning Path", id: 0},
                {name: "Number of Lines of Haskell Written", id: 1},
                {name: "MOOC Timeline", id: 2},
                {name: "Tutorials viewed by Users", id:3}
            ]
        };
    }

    updateYear = year => {
        this.setState({selectedYear: year});
    }

    updateFig = id => {
        this.setState({selectedFig:id});
    }
  
    closeModal = () => {
      this.setState(prevState => ({
          showModal: !prevState.showModal
      }))
    }

    Fig2Display = () => {
        switch (this.state.selectedFig) {
        case 0:
            return <CoursePath year={this.state.selectedYear}/>;
        case 1:
            return <LinesOfCodePerUser year={this.state.selectedYear} />;
        case 2:
            return <CalendarView year={this.state.selectedYear} />;
        case 3:
            return <AccessedTutorials year={this.state.selectedYear} />;
        default:
            return <div>Something Went Wrong... :(</div>;
        }
    }

    render() {
        return (
          <React.Fragment>
            {this.state.showModal ?
              <ModalSplashScreen closeModalFunc={this.closeModal} />
              :
              null
            }
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
          </React.Fragment>
        );
    }
}

export default App;
