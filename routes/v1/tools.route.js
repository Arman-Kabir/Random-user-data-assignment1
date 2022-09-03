const express = require("express");

const toolsControllers = require("../../controllers/tools.controller");
const { limiter } = require("../../middleware/limiter");
const viewCount = require("../../middleware/viewCount");
// const { default: rateLimit } = require('express-rate-limit');

const router = express.Router();

// router.get("/", (req, res) => {
//     // res.send("tools found");
//     res.send("tools found with id ");
// });

// router.post("/", (req, res) => {
//     res.send("tool added");
// });

router
    .route("/")
    /**
   * @api {get} /tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
    .get(toolsControllers.getAllTools)
    /**
   * @api {post} /save a tool
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
    .post(toolsControllers.saveATool);


router.route("/:id").get(viewCount,limiter, toolsControllers.getToolDetail)
.patch(toolsControllers.updateTool)
.delete(toolsControllers.deleteTool);

module.exports = router;

let tool = {
    id:1,
    name:"hammer"
}

const newTool = {name:"test"};

// PUT
tool= {name:"test"};

// PATCH
tool = {id:1,name:"test"};