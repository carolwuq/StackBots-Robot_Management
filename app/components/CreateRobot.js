import React from "react";
import { addReduxRobot } from "../redux/robots";
import { connect } from "react-redux";

class CreateRobot extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      error: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    try{
      await this.props.createSingleRobot({ ...this.state })
    } catch(e){
      this.handleError(e)
    }
  }

  handleError(err) {
    console.log('err.response.data')
    this.setState({ error: err.response.data });
  }

  render() {
    console.log(this.state.error)
    return (
      <div className="createRobot">
        {this.state.error ? <div className="errorMessage">{this.state.error}</div> : ''}
        <h2>New Robot Form</h2>
        <form className="newRobotForm" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Robot Name:</label>
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="imageUrl">Robot ImageUrl:</label>
          <input
            name="imageUrl"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
          <label htmlFor="fuelType">Fuel Type:</label>
          <select
            name="fuelType"
            value={this.state.fuelType}
            onChange={this.handleChange}
          >
            <option>electric</option>
            <option>diesel</option>
            <option>gas</option>
          </select>
          <label htmlFor="fuelLevel">Fuel Level: {this.state.fuelLevel}</label>
          <input
            name="fuelLevel"
            type="range"
            min="0"
            max="100"
            value={this.state.fuelLevel}
            onChange={this.handleChange}
          />
          <div className="createRobotbnts">
            <button className="submit" type="submit">
              Add Robot
            </button>
          </div>
        </form>

      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    robotList: reduxState.robots,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    createSingleRobot: (singleRobot) =>
      dispatch(addReduxRobot(singleRobot, history)),
  };
};

export default connect(mapState, mapDispatch)(CreateRobot);
