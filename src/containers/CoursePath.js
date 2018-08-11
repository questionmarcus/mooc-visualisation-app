import React, { Component } from "react";
import getAPIData from "../utils/api_connect.js";
import LoadingScreen from "../components/LoadingScreen.js";
import SankeyNode from "../components/SankeyNode.js";
import SankeyPath from "../components/SankeyPath.js";
import {sankey, sankeyLinkHorizontal} from "d3-sankey";

class CoursePath extends Component {

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
        getAPIData("studypath/"+this.props.year).then(
            json => this.setState(() => {return {api_data: json};})
        );
    }

    render() {
        if (this.state.api_data) {
            const width = 2000;
            const height = 600;
            const sank = sankey().nodeWidth(25).nodePadding(0).size([width,height]);
            const { nodes, links } = sank(this.state.api_data);
            return(
                <svg width="100%" viewBox={"0 0 "+width+" "+height}>
                    {links.map(
                        link => <SankeyPath
                            settings={link}
                            pathGen={sankeyLinkHorizontal()}
                            key={link.index} />
                    )}
                    {nodes.map(
                        node => <SankeyNode
                            settings={node}
                            figWidth={width}
                            figHeight={height}
                            key={node.name}/>
                    )}
                </svg>
            );
        } else {
            return (
                <LoadingScreen />
            );
        }
    }
}

export default CoursePath;
