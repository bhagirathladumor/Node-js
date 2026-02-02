const express = require("express");

const {homePage ,addbuilderpage,editbuilderpage,addBuilder,deletebtn,editbtn,updateBuilder,upload} = require("../controllers/builder.controllers.js")

const router = express.Router();

router.get("/",homePage);
router.get("/addbuilderpage",addbuilderpage);
router.get("/editbuilderpage", editbuilderpage)

router.post("/addBuilder", upload.single("image"),addBuilder)
router.post("/updateBuilder", upload.single("image"),  updateBuilder)
router.get("/deletebtn/:id",deletebtn)
router.get("/editbtn/:id",editbtn)

module.exports = router;