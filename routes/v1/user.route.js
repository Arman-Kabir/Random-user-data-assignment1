const express = require('express');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.route("/random").get(userController.aRandomUser);
router.route("/all").get(userController.allRandomUsers);
router.route("/save").post(userController.saveRandomUser);


module.exports= router;