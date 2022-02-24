import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeAssignedRobotThunk } from "../redux/singleProject";

class RobotTitle extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    await this.props.removeAssignedRobot(
      this.props.robot.id,
      this.props.robot.manager.projectId
    );
  }

  render() {
    const robot = this.props.robot;

    return (
      <div className="projectTitle">
        <img className="imageInRobotTitle" src={robot.imageUrl} alt="image" />
        <div className="projectTitleInfo">
          <div>
            <Link to={`/robots/${robot.id}`} id="singleRobot">
              Name: {robot.name}
            </Link>
          </div>
        </div>
        <form onSubmit={(ev) => ev.preventDefault()}>
          <div>
            <button
              type="button"
              className="unassign"
              onClick={this.handleClick}
            >
              Unassign
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    removeAssignedRobot: (robotId, projectId) =>
      dispatch(removeAssignedRobotThunk(robotId, projectId)),
  };
};

export default connect(null, mapDispatch)(RobotTitle);
