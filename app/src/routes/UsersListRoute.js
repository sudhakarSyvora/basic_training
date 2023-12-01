const express = require("express");
const router = express.Router();
const usersList=require('../controllers/UserListController')

router.get("/", usersList);

module.exports = router;
