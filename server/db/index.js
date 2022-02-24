const db = require('./database')
const Project = require('./project')
const Robot = require('./robot')


Project.belongsToMany(Robot, {through: 'manager'})
Robot.belongsToMany(Project, {through: 'manager'})


Robot.beforeValidate(robot => {
  if (robot.name === '') {
    throw new Error('Robot Name cannot be empty!');
  }
});

Project.beforeValidate(project => {
  if (project.title === '') {
    throw new Error('Project Title cannot be empty!');
  }
});

module.exports = {
  db,
  Project,
  Robot,
}
