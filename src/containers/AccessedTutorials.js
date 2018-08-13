import React, {Component} from "react";
import LoadingScreen from "../components/LoadingScreen.js";
import {scaleBand, scaleLinear} from "d3-scale";
import {range} from "d3-array";
import getAPIData from "../utils/api_connect.js";
import Bar from "../components/Bar.js";

class AccessedTutorials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_data:null,
            ordered_tuts: [
                "tutorial11","tutorial12","tutorial2","tutorial22","tutorial23",
                "tutorial31","tutorial32","All"
            ]
        };
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
        getAPIData("tutorialcompletion/"+this.props.year).then(
            json => this.setState(() => {return {api_data: json};})
        );
    }

    render() {
        if (this.state.api_data) {
            const figWidth = 1000;
            const margins = {"top":20,"bottom":20,"left":20,"right":20};
            const figHeight = 500;
            const nUsers = this.state.api_data.total_users;
            const xScale = scaleBand()
                .domain(range(0,this.state.api_data.tutorial_numbers.length))
                .range([margins.left,figWidth-margins.right])
                .padding(0.3);
            const yScale = scaleLinear().range([margins.top,figHeight-margins.bottom]);

            const bars = this.state.api_data.tutorial_numbers.map((tut,i) => 
                <Bar
                    barWidth={xScale.bandwidth()}
                    height={yScale(1-(tut.num_accessed/nUsers))}
                    offset={xScale(this.state.ordered_tuts.indexOf(tut.name))}
                    maxHeight={figHeight-margins.bottom}
                />
            );

            const nonCompleted = this.state.api_data.tutorial_numbers.map((tut,i) =>
                <rect
                    x={xScale(this.state.ordered_tuts.indexOf(tut.name))}
                    y={0+margins.top}
                    height={figHeight-margins.bottom-yScale(tut.num_accessed/nUsers)}
                    fill="#d3d3d3"
                    width={xScale.bandwidth()} />
            );

            const axisLabels = this.state.api_data.tutorial_numbers.map((tut,i) =>
                <text
                    x={xScale(this.state.ordered_tuts.indexOf(tut.name))+
                      xScale.bandwidth()/2}
                    y={figHeight}
                    textAnchor="middle"
                >
                    {tut.name}
                </text>
            );

            const barHeightLabels = this.state.api_data.tutorial_numbers.map((tut,i) =>
                <text
                    x={xScale(this.state.ordered_tuts.indexOf(tut.name))+
                      xScale.bandwidth()/2}
                    y={yScale(1-(tut.num_accessed/nUsers))}
                    dy="-2"
                    fontSize="12px"
                    textAnchor="middle"
                >
                    {Math.floor((tut.num_accessed/nUsers)*100)+"%"}
                </text>
            );
            return (
                <React.Fragment>
                    <h1>Number of MOOC Users Doing (at least) One Exercise in Each Tutorial</h1>
                    <svg width="100%" viewBox={"0 0 "+figWidth+" "+figHeight+""}>
                        {nonCompleted}
                        {bars}
                        {axisLabels}
                        {barHeightLabels}
                    </svg>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <h1>Number of MOOC Users Doing (at least) One Exercise in Each Tutorial</h1>
                    <LoadingScreen />
                </React.Fragment>
            );
        }
    }
}

export default AccessedTutorials;
