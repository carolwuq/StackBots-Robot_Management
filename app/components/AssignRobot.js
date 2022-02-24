import React from "react";
import { connect } from "react-redux";
import { assignRobotThunk } from "../redux/singleProject";

class AssignRobot extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    const robotId = event.target.value.split(".")[0];
    await this.props.assignRobot(robotId, this.props.projectId);
  }

  render() {
    const robots = this.props.robots;

    return (
      <div className="assignRobot">
        {robots === undefined || robots.length === 0 ? (
          "No Robot Assigned Yet"
        ) : (
          <select onChange={this.handleChange}>
            {robots.map((robot) => (
              <option key={robot.id}>
                {robot.id}. {robot.name}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    assignRobot: (robotId, projectId) =>
      dispatch(assignRobotThunk(robotId, projectId)),
  };
};

export default connect(null, mapDispatch)(AssignRobot);
