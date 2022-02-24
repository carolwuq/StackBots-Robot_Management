import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeProjectThunk } from "../redux/projects";

class ProjectCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    await this.props.removeProject(this.props.project.id);
  }

  render() {
    const project = this.props.project;

    return (
      <div className="projectCard">
        <div id="singleProjectCard">
          <Link to={`/projects/${project.id}`} id="singleProjectTitle">
            Title: {project.title}
          </Link>
          <div className="projectInfo">
            <div>Description:{project.description}</div>
            <div>Completed: {"" + project.completed}</div>
            <div>Deadline: {project.deadline}</div>
            <div>Priority: {project.priority}</div>
          </div>
        </div>
        <div className="removebtn">
          <form onSubmit={(ev) => ev.preventDefault()}>
            <button type="button" onClick={this.handleClick}>
              X
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    removeProject: (id) => dispatch(removeProjectThunk(id)),
  };
};

export default connect(null, mapDispatch)(ProjectCard);
