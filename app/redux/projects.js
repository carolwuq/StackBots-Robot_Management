import axios from "axios";

const SET_PROJECTS = "SET_PROJECTS";
const CREATE_PROJECT = "CREATE_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";
const UPDATE_PROJECT = "UPDATE_PROJECT";

export const setProjects = (projects) => {
  return {
    type: SET_PROJECTS,
    projects,
  };
};

const createNewProject = (singleProject) => {
  return {
    type: CREATE_PROJECT,
    singleProject,
  };
};

const deleteProject = (singleProject) => {
  return {
    type: DELETE_PROJECT,
    singleProject,
  };
};

const updateProject = (project) => {
  return {
    type: UPDATE_PROJECT,
    project,
  };
};

export const fetchProjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/projects");
      dispatch(setProjects(data));
    } catch (e) {
      console.error(e);
    }
  };
};

export const addProjectThunk = (singleProject, history) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post(
        "/api/projects",
        singleProject
      );
      dispatch(createNewProject(created));
      history.push("/projects");
    } catch (e) {
      console.error(e);
    }
  };
};

export const removeProjectThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/projects/${id}`);
      dispatch(deleteProject(data));
    } catch (e) {
      console.error(e);
    }
  };
};

export const updateProjectThunk = (singleProject, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/projects/${singleProject.id}`,
        singleProject
      );
      dispatch(updateProject(data));
      history.push("/projects");
    } catch (e) {
      console.error(e);
    }
  };
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
const initialState = [];

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROJECTS:
      return action.projects;
    case CREATE_PROJECT:
      return [...state, action.singleProject];
    case DELETE_PROJECT:
      return state.filter((project) => project.id !== action.singleProject.id);
    case UPDATE_PROJECT:
      return state.map((project) =>
        project.id === action.project.id ? action.project : project
      );
    default:
      return state;
  }
}
