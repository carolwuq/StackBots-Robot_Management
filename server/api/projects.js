const { Project, Robot } = require("../db");

const router = require("express").Router();

//GET    /api/projects
router.get("/", async (req, res, next) => {
  try {
    const allProjects = await Project.findAll({ include: Robot });
    res.json(allProjects);
  } catch (e) {
    next(e);
  }
});

//GET    /api/projects/:id
router.get("/:id", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id, { include: Robot });
    res.json(project);
  } catch (e) {
    next(e);
  }
});

// POST /api/projects
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Project.create(req.body));
  } catch (error) {
    next(error);
  }
});

// DELETE /api/projects/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    await project.destroy();
    res.send(project);
  } catch (error) {
    next(error);
  }
});

// PUT /api/projects/:id
router.put("/:id", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    res.send(await project.update(req.body));
  } catch (error) {
    next(error);
  }
});

// DELETEPROJECT /api/projects/:id/:robotId
router.delete("/:id/:robotId", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    await project.removeRobot(req.params.robotId);
    res.send(await Project.findByPk(req.params.id, { include: Robot }));
  } catch (error) {
    next(error);
  }
});

// PUT /api/projects/:id/:robotId
router.put("/:id/:robotId", async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    const robot = await Robot.findByPk(req.params.robotId);
    await project.addRobot(robot);
    res.send(await Project.findByPk(req.params.id, { include: Robot }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
