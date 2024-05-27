const express = require('express');
const router = express.Router();
const roomController = require('../controllers/Room');

router.route('/createRoom')
    .post(roomController.createRoom);

router.route('/getRoomByName')
    .get(roomController.getRoomByName);

router.route('/setRoom')
    .put(roomController.setRoom);

router.route('/deleteRoom')
    .delete(roomController.deleteRoom);

router.route('/getAllRooms')
    .get(roomController.getAllRooms);

module.exports = router;