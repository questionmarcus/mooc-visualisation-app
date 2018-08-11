import React, {Component} from "react";
import getAPIData from "../utils/api_connect.js";
import LoadingScreen from "../components/LoadingScreen.js";
import CalendarDay from "../components/CalendarDay.js";
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
            console.log(yearScale(2017));
            const yScale = scaleLinear().domain([0,6]).range([0,yearScale.bandwidth()]);
            const rects = this.state.api_data.map(ob => {
                return <CalendarDay
                    xPos={xScale(time.timeMonday.count(time.timeYear(ob.date),ob.date))}
                    yPos={yScale((ob.date.getDay() + 6) % 7)+yearScale(ob.date.getFullYear())}
                    size={cellSize}
                    colour={interpolateYlGn(cScale(ob.value))}
                    value={ob.value}
                    day={ob.date.toDateString()}/>;
            });
            const days = (year) =>
                ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day,ind) =>
                    <text
                        x="15"
                        y={yScale(ind)+yearScale(year)+cellSize-cellGap}
                        fontSize="12px">
                        {day}
                    </text>
                );

            const months = (year) =>
                ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((mon,ind) => {let startMonth = new Date(Date.UTC(year,ind,1,0,0,0));
                    return (
                        <text
                            x={xScale(time.timeMonday.count(time.timeYear(startMonth),startMonth))}
                            y={yScale(0)-5+yearScale(startMonth.getFullYear())}
                            fontSize="12px">
                            {mon}
                        </text>
                    );});
          
            const dayLabels = yearArray.map(year => days(year));
            const monthLabels = yearArray.map(year => months(year));
            const yearLabels = yearArray.map(year => 
                <text
                    x={xScale(0)}
                    y={yScale(0)-20+yearScale(year)}
                    fontSize="16px"
                >{year}</text>
            );
            console.log(months(2016));
            return (
                <svg width="100%" viewBox={"0 0 "+width+" "+height}>
                    {yearLabels}
                    {monthLabels}
                    {dayLabels}
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
