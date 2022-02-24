import React from "react";
import { connect } from "react-redux";
import { assignProjectThunk } from "../redux/singleRobot";

class AssignProject extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange(event) {
    const projectId = event.target.value.split(".")[0];
    await this.props.assignProject(projectId, this.props.robotId);
  }

  render() {
    const projects = this.props.projects;

    return (
      <div className="assignProject">
        {projects === undefined || projects.length === 0 ? (
          "No Project Assigned Yet"
        ) : (
          <select onChange={this.handleChange}>
            {projects.map((project) => (
              <option key={project.id}>
                {project.id}. {project.title}
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
    assignProject: (projectId, robotId) =>
      dispatch(assignProjectThunk(projectId, robotId)),
  };
};

export default connect(null, mapDispatch)(AssignProject);
