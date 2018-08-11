import React, {Component} from "react";
import getAPIData from "../utils/api_connect.js";
import LoadingScreen from "../components/LoadingScreen.js";
import CalendarDay from "../components/CalendarDay.js";
import * as time from "d3-time";

class CalendarView extends Component {
    constructor(props) {
        super(props);
        this.state = {api_data: null};
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.year !== this.props.year) {
            this.getData();
        }
    }

    getData() {
        this.setState({api_data:null});
        getAPIData("timeline/"+this.props.year).then(
            json => this.setState(() => {return {api_data: 
              json.map(ob => {return {
                  date: new Date(ob.date),
                  value:ob.value
              };})
            };})
        );
    }

    render() {
        if (this.state.api_data) {
            console.log(this.state.api_data[0]);
            console.log(time.timeMonday.count(time.timeYear(this.state.api_data[0].date),this.state.api_data[0].date));
            const rects = this.state.api_data.map(ob => {
                return <CalendarDay
                    xPos={time.timeMonday.count(time.timeYear(ob.date),ob.date)*15+3}
                    yPos={((ob.date.getDay() + 6) % 7)*15+3}
                    day={ob.date.toDateString()}/>;
            });
            console.log(rects);
            return (
                <svg width="100%" viewBox="0 0 1000 1000">
                    {rects}
                </svg>
            );
        } else {
            return (
                <LoadingScreen />
            );
        }
    }
}

export default CalendarView;
