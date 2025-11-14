import Contact from "../models/contact.model.js";
import errorHandler from "./error.controller.js";

// CREATE A NEW CONTACT
const create = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    await contact.save();
    return res.status(200).json({
      message: "Contact created successfully!",
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// GET ALL CONTACTS
const list = async (req, res) => {
  try {
    let contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// DELETE A CONTACT BY ID
const contactByID = async (req, res, next, id) => {
  try {
    let contact = await Contact.findById(id);
    if (!contact)
      return res.status("400").json({
        error: "Contact not found",
      });
    req.contact = contact;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve contact",
    });
  }
};

// READ A CONTACT BY ID
const read = (req, res) => {
  return res.json(req.contact);
};

// UPDATE A CONTACT BY ID
const update = async (req, res) => {
  try {
    let contact = req.contact;
    contact = Object.assign(contact, req.body);
    contact.updated = Date.now();
    await contact.save();
    res.json(contact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};


// DELETE A CONTACT BY ID
const remove = async (req, res) => {
  try {
    let contact = req.contact;
    let deletedContact = await contact.deleteOne();
    res.json(deletedContact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// DELETE ALL CONTACTS
const removeAll = async (req, res) => {
  try {
    const result = await Contact.deleteMany({});
    res.json({
      message: `All contacts deleted successfully! Total deleted: ${result.deletedCount}`,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, contactByID, read, list, remove, update, removeAll };