import React, { Component } from "react";
import * as nLinesCode from "../data/nLinesCode.json";
import getAPIData from "../utils/api_connect";
import Bar from "../components/Bar";
import XAxis from "../components/XAxis";
import YAxis from "../components/YAxis";
import XLabel from "../components/XLabel";
import YLabel from "../components/YLabel";
import { extent, zip } from "d3-array";
import {scaleLinear, scaleBand} from "d3-scale";

class LinesOfCodePerUser extends Component {
    constructor(props) {
        super(props);
        this.state = {api_data: null};
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        getAPIData("histogram/2017").then(
            json => this.setState(() => {return {api_data: json};})
        );
    }

    render () {
        if (this.state.api_data != null) {
            const { data, bins } = this.state.api_data;
            const { width, height } = {"width": "1000", "height":"500"};
            const margin = {"left":60, "bottom":50};
            const zipped = zip(data,bins);
            const fontSize = "12";

            //console.log(getAPIData("histogram"));

            const xScale = scaleBand().domain(bins).range([margin.left,width]).paddingInner(0.05);

            const yScale = scaleLinear().domain(extent(data)).range([height-margin.bottom,0]);

            const bars = zipped.map((arr, i) => {
                return <Bar
                    barWidth={xScale.bandwidth()}
                    offset={xScale(arr[1])}
                    height={yScale(arr[0])}
                    maxHeight={height-margin.bottom}
                    key={i}/>;
            });

            const xAxis = <XAxis
                scale={xScale}
                transform={"translate(0 "+(height-margin.bottom)+")"}
                fontsize={fontSize}/>;

            const yAxis = <YAxis
                scale={yScale}
                transform={"translate("+margin.left+" 0)"}
                fontsize={fontSize}/>;

            const xLabel = <XLabel fontSize="16px">Number of Lines of Code</XLabel>;

            const yLabel = <YLabel fontSize="16px" height={height}>Number of Users</YLabel>;

            return (
                <svg width="100%" viewBox={"0 0 "+width+" "+height}>
                    {bars}{xAxis}{yAxis}{xLabel}{yLabel}
                </svg>
            );
        } else {
            return (
                <div>Loading</div>
            );
        }
    }
}

export default LinesOfCodePerUser;
