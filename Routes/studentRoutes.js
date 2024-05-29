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

router.route('/registeredStudents')
    .get(StudentController.registeredStudents);
    /*
router.route('/getWorkingTime')
    .get(StudentController.getWorkingTime);
*/


router.route('/getUnregisteredStudents')
    .get(StudentController.getUnregisteredStudents);

router.route('/uploadPhoto')
    .post(StudentController.uploadPhoto);

router.route('/downloadFile')
    .get(StudentController.downloadFile);


module.exports = router;