import React from "react";
import { fetchSingleProject } from "../redux/singleProject";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RobotTitle from "./RobotTitle";

class SingleProject extends React.Component {
  componentDidMount() {
    this.props.loadSingleProject(this.props.match.params.id);
  }

  render() {
    const project = this.props.project;

    return project === undefined || project.length === 0 ? (
      "NO PROJECT"
    ) : (
      <div className="singleProject">
        <h2>Show Project</h2>
        <div className="singleProjectCard">
          <div>Title: {project.title}</div>
          <div className="singleProjectInfo">
            <div>Description:{project.description}</div>
            <div>Completed: {"" + project.completed}</div>
            <div>Deadline: {project.deadline}</div>
            <div>Priority: {project.priority}</div>
            <div>
              <Link to={`/projects/${project.id}/edit`}>
                <button id="edit">Edit</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="singleRobotProject">
          <h3>Robots assigned to: {project.name}</h3>
          <div className="singleRobotProjectTitle">
            {project.robots === undefined || project.robots.length === 0 ? (
              <div className="singleProjectRobotName">
                {" "}
                Robot: not assigned yet
              </div>
            ) : (
              project.robots.map((robot) => (
                <RobotTitle key={robot.id} robot={robot} />
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
    project: reduxState.project,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleProject: (id) => dispatch(fetchSingleProject(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProject);
