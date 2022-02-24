import React from "react";
import { fetchSingleRobot } from "../redux/singleRobot";
import { updateRobotThunk } from "../redux/robots";
import { connect } from "react-redux";
import { fetchProjects } from "../redux/projects";
import ProjectTitle from "./ProjectTitle";
import AssignProject from "./AssignProject";

class EditRobot extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      fuelLevel: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.loadingAllProjects();
    this.props.loadSingleRobot(this.props.match.params.id);
    this.setState({
      name: this.props.robot.name || "",
      fuelLevel: this.props.robot.fuelLevel || "",
      imageUrl: this.props.robot.imageUrl || "",
      fuelType: this.props.robot.fuelType || "",
    });
  }

  componentDidUpdate(prePro) {
    if (prePro.robot.id !== this.props.robot.id) {
      this.setState({
        name: this.props.robot.name || "",
        fuelLevel: this.props.robot.fuelLevel || "",
        imageUrl: this.props.robot.imageUrl || "",
        fuelType: this.props.robot.fuelType || "",
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateSingleRobot({ ...this.props.robot, ...this.state });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const robot = this.state;
    const assignedProjects = this.props.robot.projects;
    const allProjects = this.props.projects;

    return (
      <div className="singleRobot">
        <h2>Edit Robot</h2>
        <form className="robot-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Robot Name:</label>
          <input name="name" value={robot.name} onChange={this.handleChange} />

          {/* <label htmlFor="fuelLevel">Fuel Level: </label>
          <input
            name="fuelLevel"
            value={robot.fuelLevel}
            onChange={this.handleChange}
          /> */}

          <label htmlFor="imageUrl">Robot ImageUrl:</label>
          <input
            name="imageUrl"
            value={robot.imageUrl}
            onChange={this.handleChange}
          />
          <label htmlFor="fuelType">Fuel Type:</label>
          <select
            name="fuelType"
            value={robot.fuelType}
            onChange={this.handleChange}
          >
            <option>electric</option>
            <option>diesel</option>
            <option>gas</option>
          </select>
          <label htmlFor="fuelLevel">Fuel Level: {robot.fuelLevel}</label>
          <input
            name="fuelLevel"
            type="range"
            min="0"
            max="100"
            value={robot.fuelLevel}
            onChange={this.handleChange}
          />

          <button id="saveChanges" type="submit">
            Save Changes
          </button>
        </form>

        <div className="assignProject">
          <h3>Projects assigned to {robot.name} </h3>
          <AssignProject projects={allProjects} robotId={this.props.robot.id} />

          <div className="assignedProjectinEditRobot">
            {assignedProjects === undefined || assignedProjects.length === 0
              ? "No Project Assigned Yet"
              : assignedProjects.map((project) => (
                  <ProjectTitle key={project.id} project={project} />
                ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    robot: reduxState.robot,
    projects: reduxState.projects,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    loadSingleRobot: (id) => dispatch(fetchSingleRobot(id)),
    updateSingleRobot: (robot) => dispatch(updateRobotThunk(robot, history)),
    loadingAllProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(mapState, mapDispatch)(EditRobot);
