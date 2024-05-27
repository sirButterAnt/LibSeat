const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/Seat');


router.route('/getSeats')
    .get(seatController.getAllSeats);

router.route('/getSeat')
    .get(seatController.getSeatById);

router.route('/deleteSeat')
    .delete(seatController.deleteSeatById);

router.route('/setSeat')
    .put(seatController.updateSeat);

router.route('/getSeatWorkingTime')
    .get(seatController.getWorkingTimeForSeat);

router.route('/allocateSeat')
    .put(seatController.allocateSeatById);

router.route('/deallocateSeat')
    .put(seatController.deallocateSeatById);

module.exports = router;