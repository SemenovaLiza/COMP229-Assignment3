import Project from "../models/project.model.js";
import errorHandler from "./error.controller.js";

// CREATE A NEW PROJECT
const create = async (req, res) => {
  const project = new Project(req.body);
  try {
    await project.save();
    return res.status(200).json({
      message: "Project created successfully!",
      project: project,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// GET ALL PROJECTS
const list = async (req, res) => {
  try {
    let projects = await Project.find();
    res.json(projects);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// FIND PROJECT BY ID AND ATTACH TO REQUEST
const projectByID = async (req, res, next, id) => {
  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    
    req.project = project;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve project" });
  }
};

// READ A PROJECT BY ID
const read = (req, res) => {
  return res.json(req.project);
};

// UPDATE A PROJECT BY ID
const update = async (req, res) => {
  try {
    let project = req.project;
    project = Object.assign(project, req.body);
    project.updated = Date.now();
    await project.save();
    res.json(project);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// DELETE A PROJECT BY ID
const remove = async (req, res) => {
  try {
    let project = req.project;
    let deletedProject = await project.deleteOne();
    res.json(deletedProject);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// DELETE ALL PROJECTS
const removeAll = async (req, res) => {
  try {
    const result = await Project.deleteMany({});
    res.json({
      message: `All projects deleted successfully! Total deleted: ${result.deletedCount}`,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
export default { create, projectByID, read, list, remove, update, removeAll };