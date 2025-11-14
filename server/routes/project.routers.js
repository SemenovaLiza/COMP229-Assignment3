import express from "express";
import projectCtrl from "../controllers/project.controller.js";
import authCtrl from "../controllers/auth.controller.js";
const router = express.Router();

// All routes require authentication
router.route("/api/projects")
  .post(authCtrl.requireSignin, projectCtrl.create)
  .get(authCtrl.requireSignin, projectCtrl.list)
  .delete(authCtrl.requireSignin, projectCtrl.removeAll);

router
  .route("/api/projects/:projectId")
  .get(authCtrl.requireSignin, projectCtrl.read)
  .put(authCtrl.requireSignin, projectCtrl.update)
  .delete(authCtrl.requireSignin, projectCtrl.remove);

router.param("projectId", projectCtrl.projectByID);

export default router;