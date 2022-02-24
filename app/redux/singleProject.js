import axios from "axios";

const SET_SINGLE_PROJECT = "SET_SINGLE_PROJECT";
const UNASSIGN_ROBOT = "UNASSIGN_ROBOT";
const ASSIGN_ROBOT = "ASSIGN_ROBOT";

const setSingleProject = (project) => {
  return {
    type: SET_SINGLE_PROJECT,
    project,
  };
};

const unassignRobot = (project, robotId) => {
  return {
    type: UNASSIGN_ROBOT,
    project,
    robotId,
  };
};

const assignRobot = (project, robotId) => {
  return {
    type: ASSIGN_ROBOT,
    project,
    robotId,
  };
};

export const fetchSingleProject = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/projects/${id}`);
      dispatch(setSingleProject(data));
    } catch (e) {
      console.error(e);
    }
  };
};

export const removeAssignedRobotThunk = (robotId, projectId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/api/projects/${projectId}/${robotId}`
      );
      dispatch(unassignRobot({ ...data, robotId }));
    } catch (e) {
      console.error(e);
    }
  };
};

export const assignRobotThunk = (robotId, projectId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/projects/${projectId}/${robotId}`);
      dispatch(assignRobot({ ...data, robotId }));
    } catch (e) {
      console.error(e);
    }
  };
};

const initialState = {};

export default function singleProjectReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PROJECT:
      return action.project;
    case UNASSIGN_ROBOT:
      return action.project;
    case ASSIGN_ROBOT:
      return action.project;
    default:
      return state;
  }
}
