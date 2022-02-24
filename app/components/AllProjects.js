import React from "react";
import { connect } from "react-redux";
import ProjectCard from "./ProjectCard";
import { fetchProjects } from "../redux/projects";
import { Link } from "react-router-dom";

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProjects extends React.Component {
  componentDidMount() {
    this.props.loadingAllProjects();
  }

  render() {
    return this.props.projects === undefined ||
      this.props.projects.length === 0 ? (
      "NO PROJECTS"
    ) : (
      <div className="bgRobots">
        <div id="allRobots">
          <h2>All Projects</h2>
          <h3>
            <Link to="/projects/create">
              <button id="addARobot">Add a Project</button>
            </Link>
          </h3>
        </div>
        <div id="allRobotsCards">
          {this.props.projects.map((project) => {
            return <ProjectCard key={project.id} project={project} />;
          })}
        </div>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    projects: reduxState.projects,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadingAllProjects: () => dispatch(fetchProjects()),
  };
};

export default connect(mapState, mapDispatch)(AllProjects);
