import React, {Component} from "react";
import getAPIData from "../utils/api_connect.js";
import LoadingScreen from "../components/LoadingScreen.js";
import CalendarDay from "../components/CalendarDay.js";
import * as labels from "../components/CalendarLabels.js";
import colourBar from "../components/colourBar.js";
import * as time from "d3-time";
import {min,max,range} from "d3-array";
import {scaleLinear, scaleBand} from "d3-scale";
import {interpolateYlGn} from "d3-scale-chromatic";

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
            const startYear = min(this.state.api_data.map(ob => ob.date.getFullYear()));
            const endYear = max(this.state.api_data.map(ob => ob.date.getFullYear()));
            const yearHeight = 200;
            const yearArray = range(startYear, endYear+1);
            const height = yearArray.length * yearHeight;
            const width = 1000;
            const cellGap = 3;
            const cellSize = (width/52)-cellGap;
            const cScale = scaleLinear().domain(
                [0, max(this.state.api_data.map(ob => ob.value))]
            );
            const xScale = scaleLinear().domain([0,52]).range([40,width]);
            const yearScale = scaleBand().domain(yearArray).range([0,height]).padding(0.3);
            const yScale = scaleLinear().domain([0,6]).range([0,yearScale.bandwidth()]);
            const weekNum = (date) => time.timeMonday.count(time.timeYear(date),date);

            const rects = this.state.api_data.map(ob => {
                return <CalendarDay
                    key={ob.date.toISOString().substring(0,10)}
                    xPos={xScale(weekNum(ob.date))}
                    yPos={yScale((ob.date.getDay() + 6) % 7)+yearScale(ob.date.getFullYear())}
                    size={cellSize}
                    colour={interpolateYlGn(cScale(ob.value))}
                    value={ob.value}
                    day={ob.date.toDateString()}/>;
            });
            const dayLabels = yearArray.map(year => 
                labels.dayLabel(year,yScale,yearScale,cellSize,cellGap)
            );
            const monthLabels = yearArray.map(year => 
                labels.monthLabel(year,xScale,weekNum,yScale,yearScale)
            );
            const yearLabels = yearArray.map(year =>
                labels.yearLabel(year,xScale,yScale,yearScale)
            );
            
            return (
                <React.Fragment>
                    <h1>Active Daily MOOC Users Calendar</h1>
                    <svg width="100%" viewBox={"0 0 "+width+" "+(height+50)}>
                        {yearLabels}
                        {monthLabels}
                        {dayLabels}
                        {rects}
                        {colourBar(
                            700,
                            width,
                            height,
                            min(this.state.api_data.map(ob => ob.value)),
                            max(this.state.api_data.map(ob => ob.value)),
                            interpolateYlGn)
                        }
                    </svg>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <h1>Active Daily MOOC Users Calendar</h1>
                    <LoadingScreen />
                </React.Fragment>
            );
        }
    }
}

export default CalendarView;
