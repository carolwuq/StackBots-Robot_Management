import axios from "axios";

const SET_ROBOTS = "SET_ROBOTS";
const CREATE_ROBOT = "CREATE_ROBOT";
const DELETE_ROBOT = "DELETE_ROBOT";
const UPDATE_ROBOT = "UPDATE_ROBOT";

export const setRobots = (robots) => {
  return {
    type: SET_ROBOTS,
    robots,
  };
};

const createNewRobot = (singleRobot) => {
  return {
    type: CREATE_ROBOT,
    singleRobot,
  };
};

const deleteRobot = (singleRobot) => {
  return {
    type: DELETE_ROBOT,
    singleRobot,
  };
};

const updateRobot = (robot) => {
  return {
    type: UPDATE_ROBOT,
    robot,
  };
};

export const fetchRobots = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/robots");
      dispatch(setRobots(data));
    } catch (e) {
      console.error(e);
    }
  };
};

export const addReduxRobot = (singleRobot, history) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post("/api/robots", singleRobot);
      dispatch(createNewRobot(created));
      history.push("/robots");
    } catch (e) {
      console.log('hello in the thunk')
      console.error(e)
      throw e 
    }
  };
};

export const removeRobotThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/robots/${id}`);
      dispatch(deleteRobot(data));
    } catch (e) {
      console.error(e);
    }
  };
};

export const updateRobotThunk = (singleRobot, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/robots/${singleRobot.id}`,
        singleRobot
      );
      dispatch(updateRobot(data));
      history.push("/robots");
    } catch (e) {
      console.error(e);
    }
  };
};

const initialState = [];

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function robotsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROBOTS:
      return action.robots;
    case CREATE_ROBOT:
      console.log("in the robotsReducer, robots array", [
        ...state,
        action.singleRobot,
      ]);
      return [...state, action.singleRobot];
    case DELETE_ROBOT:
      return state.filter((robot) => robot.id !== action.singleRobot.id);
    case UPDATE_ROBOT:
      return state.map((robot) =>
        robot.id === action.robot.id ? action.robot : robot
      );
    default:
      return state;
  }
}
