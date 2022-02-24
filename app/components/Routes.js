import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AllProjects from "./AllProjects";
import AllRobots from "./AllRobots";
import SingleRobot from "./SingleRobot";
import SingleProject from "./SingleProject";
import CreateRobot from "./CreateRobot";
import CreateProject from "./CreateProject";
import EditRobot from "./EditRobot";
import EditProject from "./EditProject";
import { HomePage } from "./HomePage";

const Routes = () => {
  return (
    <Router>
      <div>
        <div id="nav">
          <Link id="homenavlink" to="/">
            Home
          </Link>
          <Link className="navlink" to="/robots">
            Robots
          </Link>
          <Link className="navlink" to="/projects">
            Projects
          </Link>
        </div>
        <main>
          <div>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/robots" component={AllRobots} />
              <Route exact path="/projects" component={AllProjects} />
              <Route path="/robots/create" component={CreateRobot} />
              <Route path="/projects/create" component={CreateProject} />
              <Route exact path="/robots/:id" component={SingleRobot} />
              <Route exact path="/projects/:id" component={SingleProject} />
              <Route path="/robots/:id/edit" component={EditRobot} />
              <Route path="/projects/:id/edit" component={EditProject} />
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default Routes;
