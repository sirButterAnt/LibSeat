const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/Admin');

router.route('/getAdmin')
    .get(adminController.getAdmin);

router.route('/setAdmin')
    .put(adminController.setAdmin);

router.route('/registerAdmin')
    .post(adminController.registerAdmin);

router.route('/deleteAdmin')
    .delete(adminController.deleteAdmin);

module.exports = router;
