const express = require("express");
const router = express.Router()
const studentcontroller = require('../controller/studentController')

router.post("/student",studentcontroller.createAndAddStudent)
router.get("/student",studentcontroller.viewStudent)
router.delete('/student/:studentId',studentcontroller.deleteStudentSubject)

module.exports = router;