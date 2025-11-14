import Qualification from "../models/qualification.model.js";
import errorHandler from "./error.controller.js";

// CREATE A NEW QUALIFICATION
const create = async (req, res) => {
  const qualification = new Qualification(req.body);
  try {
    await qualification.save();
    return res.status(200).json({
      message: "Qualification created successfully!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// GET ALL QUALIFICATIONS
const list = async (req, res) => {
  try {
    let qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// DELETE A QUALIFICATION BY ID
const qualificationByID = async (req, res, next, id) => {
  try {
    let qualification = await Qualification.findById(id);
    if (!qualification)
      return res.status("400").json({
        error: "Qualification not found",
      });
    req.qualification = qualification;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve qualification",
    });
  }
};

// READ A QUALIFICATION BY ID
const read = (req, res) => {
  return res.json(req.qualification);
};

// UPDATE A QUALIFICATION BY ID
const update = async (req, res) => {
  try {
    let qualification = req.qualification;
    qualification = Object.assign(qualification, req.body);
    qualification.updated = Date.now();
    await qualification.save();
    res.json(qualification);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};


// DELETE A QUALIFICATION BY ID
const remove = async (req, res) => {
  try {
    let qualification = req.qualification;
    let deletedQualification = await qualification.deleteOne();
    res.json(deletedQualification);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// DELETE ALL QUALIFICATIONS
const removeAll = async (req, res) => {
  try {
    const result = await Qualification.deleteMany({});
    res.json({
      message: `All qualifications deleted successfully! Total deleted: ${result.deletedCount}`,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, qualificationByID, read, list, remove, update, removeAll };