import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeRobotThunk } from "../redux/robots";

class RobotCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    await this.props.removeRobot(this.props.robot.id);
  }

  render() {
    const robot = this.props.robot;

    return (
      <div className="robotCard">
        <div className="robotImage">
          <img className="robotImage" src={robot.imageUrl} alt="image" />
        </div>
        <div className="robotInfo">
          <Link to={`/robots/${robot.id}`}>
            <p>Name: {robot.name}</p>
          </Link>
          <p>Fuel Type: {robot.fuelType}</p>
          <p>Fuel Level: {robot.fuelLevel}</p>

          {robot.projects === undefined || robot.projects.length === 0 ? (
            <p>Project: not assigned yet</p>
          ) : (
            robot.projects.map((project) => (
              <p key={project.id}>Project: {project.title}</p>
            ))
          )}
        </div>
        <form className="removeBtn" onSubmit={(ev) => ev.preventDefault()}>
          <div>
            <button type="button" onClick={this.handleClick}>
              X
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    removeRobot: (id) => dispatch(removeRobotThunk(id)),
  };
};

export default connect(null, mapDispatch)(RobotCard);
