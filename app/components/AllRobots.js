import React from "react";
import { connect } from "react-redux";
import RobotCard from "./RobotCard";
import { fetchRobots } from "../redux/robots";
import { Link } from "react-router-dom";

// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllRobots extends React.Component {
  componentDidMount() {
    this.props.loadRobots();
  }

  render() {
    return this.props.state === undefined || this.props.state.length === 0 ? (
      "NO ROBOTS"
    ) : (
      <div className="bgRobots">
        <div id="allRobots">
          <h2>All Robots</h2>
          <h3>
            <Link to="/robots/create">
              <button id="addARobot">Add a Robot</button>
            </Link>
          </h3>
        </div>
        <div id="allRobotsCards">
          {this.props.state.map((robot) => {
            return <RobotCard key={robot.id} robot={robot} />;
          })}
        </div>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    state: reduxState.robots,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadRobots: () => dispatch(fetchRobots()),
  };
};

export default connect(mapState, mapDispatch)(AllRobots);
