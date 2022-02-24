import React from "react";
import { fetchSingleProject } from "../redux/singleProject";
import { updateProjectThunk } from "../redux/projects";
import { connect } from "react-redux";
import { fetchRobots } from "../redux/robots";
import AssignRobot from "./AssignRobot";
import RobotTitle from "./RobotTitle";

class EditProject extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      completed: false,
      description: "This is description",
      priority: 1,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCompletedChange = this.handleCompletedChange.bind(this);
  }

  componentDidMount() {
    this.props.loadingAllRobots();
    this.props.loadSingleProject(this.props.match.params.id);
    this.setState({
      title: this.props.project.title || "",
      completed: this.props.project.completed || false,
      description: this.props.project.description || "",
      priority: this.props.project.priority || "",
    });
  }

  componentDidUpdate(prePro) {
    if (prePro.project.id !== this.props.project.id) {
      this.setState({
        title: this.props.project.title || "",
        completed: this.props.project.completed || false,
        description: this.props.project.description || "",
        priority: this.props.project.priority || "",
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateSingleProject({ ...this.props.project, ...this.state });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleCompletedChange(event) {
    this.setState({
      [event.target.name]: event.target.value === "true",
    });
  }

  render() {
    const project = this.state;
    const assignedRobots = this.props.project.robots;
    const allRobots = this.props.robots;
    const completed = project.completed;

    return (
      <div className="singleEditProject">
        <h2>Edit Project</h2>
        <form className="project-form" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            name="title"
            value={project.title}
            onChange={this.handleChange}
          />
          <label htmlFor="priority">Priority: {project.priority}</label>
          <input
            name="priority"
            type="range"
            min="1"
            max="10"
            value={project.priority}
            onChange={this.handleChange}
          />
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            onChange={this.handleChange}
            rows="4"
            cols="50"
            value={project.description}
          />
          <div>
            <label htmlFor="completed">Completed: </label>
            <label>
              <input
                type="radio"
                name="completed"
                checked={completed}
                onChange={this.handleCompletedChange}
                value={true}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="completed"
                checked={!completed}
                onChange={this.handleCompletedChange}
                value={false}
              />
              No
            </label>
          </div>
          <button className="submit" type="submit">
            Save Changes
          </button>
        </form>

        <div className="assignRobot">
          Robots assigned to {project.title}
          <AssignRobot robots={allRobots} projectId={this.props.project.id} />
          <div className="assignedRobotsinEditProject">
            {assignedRobots === undefined || assignedRobots.length === 0
              ? "No Robot Assigned Yet"
              : assignedRobots.map((robot) => (
                  <RobotTitle key={robot.id} robot={robot} />
                ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    project: reduxState.project,
    robots: reduxState.robots,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    loadSingleProject: (id) => dispatch(fetchSingleProject(id)),
    updateSingleProject: (project) =>
      dispatch(updateProjectThunk(project, history)),
    loadingAllRobots: () => dispatch(fetchRobots()),
  };
};

export default connect(mapState, mapDispatch)(EditProject);
