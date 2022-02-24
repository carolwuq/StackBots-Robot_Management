const { Robot, Project } = require("../db");

const router = require("express").Router();

//GET    /api/robots
router.get("/", async (req, res, next) => {
  try {
    const allRobots = await Robot.findAll({ include: Project });
    res.json(allRobots);
  } catch (e) {
    next(e);
  }
});

//GET    /api/robots/:id
router.get("/:id", async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.id, { include: Project });
    res.json(robot);
  } catch (e) {
    next(e);
  }
});

//GET    /api/robots/:id
router.get("/:id", async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.id, { include: Project });
    res.json(robot);
  } catch (e) {
    next(e);
  }
});

// POST /api/robots
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Robot.create(req.body));
  } catch (error) {
    next(error);
  }
});

// DELETE /api/robots/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.id);
    await robot.destroy();
    res.send(robot);
  } catch (error) {
    next(error);
  }
});

// PUT /api/robots/:id
router.put("/:id", async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.id);
    res.send(await robot.update(req.body));
  } catch (error) {
    next(error);
  }
});

// DELETEPROJECT /api/robots/:id/:projectId
router.delete("/:id/:projectId", async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.id);
    await robot.removeProject(req.params.projectId);
    res.send(await Robot.findByPk(req.params.id, { include: Project }));
  } catch (error) {
    next(error);
  }
});

// PUT /api/robots/:id/:projectId
router.put("/:id/:projectId", async (req, res, next) => {
  try {
    const robot = await Robot.findByPk(req.params.id);
    await robot.addProject(req.params.projectId);
    res.send(await Robot.findByPk(req.params.id, { include: Project }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
