import React from "react";
import { addProjectThunk } from "../redux/projects";
import { connect } from "react-redux";

class createNewProject extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      completed: false,
      description: "This is description...",
      priority: 1,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleCompletedChange(event) {
    this.setState({
      [event.target.name]: event.target.value === "true",
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createSingleProject({ ...this.state });
  }

  render() {
    return (
      <div className="createProject">
        <h2>New Project Form</h2>
        <form className="newProjectForm" onSubmit={this.handleSubmit}>
          <label htmlFor="title">Project Title:</label>
          <input
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <label htmlFor="priority">Priority: {this.state.priority}</label>
          <input
            name="priority"
            type="range"
            min="1"
            max="10"
            value={this.state.priority}
            onChange={this.handleChange}
          />
          <label htmlFor="description">Description: </label>
          <textarea
            name="description"
            onChange={this.handleChange}
            rows="4"
            cols="50"
            value={this.state.description}
          />
          <div>
            <label htmlFor="completed">Completed: </label>
            <label>
              <input
                type="radio"
                name="completed"
                checked={this.state.completed}
                onChange={this.handleCompletedChange}
                value={true}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="completed"
                checked={!this.state.completed}
                onChange={this.handleCompletedChange}
                value={false}
              />
              No
            </label>
          </div>
          <div className="createRobotbnts">
            <button className="submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    projectList: reduxState.projects,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    createSingleProject: (singleProject) =>
      dispatch(addProjectThunk(singleProject, history)),
  };
};

export default connect(mapState, mapDispatch)(createNewProject);
