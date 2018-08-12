import React, { Component } from "react";
import getAPIData from "../utils/api_connect.js";
import LoadingScreen from "../components/LoadingScreen.js";
import SankeyNode from "../components/SankeyNode.js";
import SankeyPath from "../components/SankeyPath.js";
import {sankey, sankeyLinkHorizontal} from "d3-sankey";

class CoursePath extends Component {

    constructor(props) {
        super(props);
        this.state = {api_data: null,reverse:false};
        this.getData = this.getData.bind(this);
        this.reversePath = this.reversePath.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.year !== this.props.year || prevState.reverse !== this.state.reverse) {
            this.getData();
        }
    }

    getData() {
        this.setState({api_data:null});
        const urlString = this.state.reverse ? "studypath/"+this.props.year+"/reverse" : "studypath/"+this.props.year;
        getAPIData(urlString).then(
            json => this.setState(() => {return {api_data: json};})
        );
    }

    reversePath() {
        this.setState({reverse: this.state.reverse ? false : true});
    }

    render() {
        if (this.state.api_data) {
            const width = 2000;
            const height = 600;
            const sank = sankey().nodeWidth(25).nodePadding(0).size([width,height]);
            const { nodes, links } = sank(this.state.api_data);
            return(
                <React.Fragment>
                    <h1>Paths taken by users during MOOC</h1>
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
                    <button onClick={() => {this.reversePath();}}>
                        {this.state.reverse ? "Show Forward Progess" : "Show \"Back-tracking\" Progess"}
                    </button>
                    <div className="fig-info">
                        <p>
              This diagram shows the {this.state.reverse ? "backwards" : "forwards"} path that MOOC users have taken during the course.
                            {this.state.reverse ?
                                "This means that the users have gone back to an exercise rather than forward to the next, possibly indicating a need to revise a topic."
                                :
                                "This means that the users have gone on to an exercise further on in the course, possibly skipping courses they feel are unimportant."
                            }
                        </p>
                        <p>
              Each vertical bar represents a <em>Do It Yourself</em> exercise that was given, and the height of these bars represents the total number of users that took part in the exercise.
                        </p>
                        <p>
              From each exercise we can see the <em>path</em> MOOC users have taken from the exercises in light grey. The wider the path is, the more users have taken that route.
                        </p>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <h1>Paths taken by users during MOOC</h1>
                    <LoadingScreen />
                </React.Fragment>
            );
        }
    }
}

export default CoursePath;
