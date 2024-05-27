const express = require('express');
const router = express.Router();
const StudentController = require('../Controllers/Student');

router.route('/createStudent')
    .post(StudentController.createStudent);

router.route('/registerStudent')
    .put(StudentController.registerStudent);

router.route('/disapproveStudent')
    .put(StudentController.disapproveStudent);

router.route('/deleteStudent')
    .delete(StudentController.deleteStudent);

router.route('/getStudent')
    .get(StudentController.getStudent);

router.route('/setStudent')
    .put(StudentController.setStudent);

router.route('/getWorkingTime')
    .get(StudentController.getWorkingTime);

router.route('/getUnregisteredStudents')
    .get(StudentController.getUnregisteredStudents);

router.route('/dontAcceptStudent')
    .delete(StudentController.dontAcceptStudent);

module.exports = router;