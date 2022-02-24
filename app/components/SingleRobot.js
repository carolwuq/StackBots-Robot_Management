import React from "react";
import { fetchSingleRobot } from "../redux/singleRobot";
import { updateRobotThunk } from "../redux/robots";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProjectTitle from "./ProjectTitle";

class SingleRobot extends React.Component {
  componentDidMount() {
    this.props.loadSingleRobot(this.props.match.params.id);
  }

  render() {
    const robot = this.props.robot;

    return robot === undefined || robot.length === 0 ? (
      "NO ROBOT"
    ) : (
      <div className="singleRobot">
        <h2>SHOW ROBOT</h2>
        <div className="singleRobotCard">
          <a>
            <img
              className="singleRobotImage"
              src={robot.imageUrl}
              alt="image"
            />
          </a>
          <div className="singleRobotInfo">
            <div>Name: {robot.name}</div>
            <div>Fuel Type: {robot.fuelType}</div>
            <div>Fuel Level: {robot.fuelLevel}</div>
            <div>
              <Link to={`/robots/${robot.id}/edit`}>
                <button id="edit">Edit</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="singleRobotProject">
          <h3>Projects assigned to: {robot.name}</h3>
          <div className="singleRobotProjectTitle">
            {robot.projects === undefined || robot.projects.length === 0 ? (
              <div className="singleRobotProjectName">
                {" "}
                Project: not assigned yet
              </div>
            ) : (
              robot.projects.map((project) => (
                <ProjectTitle key={project.id} project={project} />
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    robot: reduxState.robot,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    loadSingleRobot: (id) => dispatch(fetchSingleRobot(id)),
    updateSingleRobot: (robot) => dispatch(updateRobotThunk(robot, history)),
  };
};

export default connect(mapState, mapDispatch)(SingleRobot);
