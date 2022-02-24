import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeAssignedProjectThunk } from "../redux/singleRobot";

class ProjectTitle extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    await this.props.removeAssignedProject(
      this.props.project.id,
      this.props.project.manager.robotId
    );
  }

  render() {
    const project = this.props.project;

    return (
      <div className="projectTitle">
        <Link to={`/projects/${project.id}`} className="projectTitleSelect">
          Title: {project.title}
        </Link>
        <div className="projectTitleInfo">
          <div>Description:{project.description}</div>
          <div>Completed: {"" + project.completed}</div>
          <div>Deadline: {project.deadline}</div>
          <div>Priority: {project.priority}</div>
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
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    removeAssignedProject: (projectId, robotId) =>
      dispatch(removeAssignedProjectThunk(projectId, robotId)),
  };
};

export default connect(null, mapDispatch)(ProjectTitle);
