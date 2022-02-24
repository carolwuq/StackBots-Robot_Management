import axios from "axios";

const SET_SINGLE_ROBOT = "SET_SINGLE_ROBOT";
const UNASSIGN_PROJECT = "UNASSIGN_PROJECT";
const ASSIGN_PROJECT = "ASSIGN_PROJECT";

const setSingleRobot = (robot) => {
  return {
    type: SET_SINGLE_ROBOT,
    robot,
  };
};

const unassignProject = (robot, projectId) => {
  return {
    type: UNASSIGN_PROJECT,
    robot,
    projectId,
  };
};

const assignProject = (robot, projectId) => {
  return {
    type: ASSIGN_PROJECT,
    robot,
    projectId,
  };
};

export const fetchSingleRobot = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/robots/${id}`);
      dispatch(setSingleRobot(data));
    } catch (e) {
      console.error(e);
    }
  };
};

export const removeAssignedProjectThunk = (projectId, robotId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/robots/${robotId}/${projectId}`
      );
      dispatch(unassignProject({ ...data, projectId }));
    } catch (e) {
      console.error(e);
    }
  };
};

export const assignProjectThunk = (projectId, robotId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/robots/${robotId}/${projectId}`);
      dispatch(assignProject({ ...data, projectId }));
    } catch (e) {
      console.error(e);
    }
  };
};

const initialState = {};

export default function singleRobotReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_ROBOT:
      return action.robot;
    case UNASSIGN_PROJECT:
      return action.robot;
    case ASSIGN_PROJECT:
      return action.robot;
    default:
      return state;
  }
}
