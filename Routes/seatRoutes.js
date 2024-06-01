const express = require('express');
const router = express.Router();
const seatController = require('../Controllers/Seat');


router.route('/createSeat')
    .post(seatController.createSeat);

router.route('/getSeats')
    .post(seatController.getSeats);

router.route('/getSeat')
    .get(seatController.getSeat);


router.route('/deleteSeat')
    .delete(seatController.deleteSeat);

router.route('/setSeat')
    .put(seatController.setSeat);
/*
router.route('/getSeatWorkingTime')
    .get(seatController.getWorkingTimeForSeat);
*/
router.route('/allocateSeat')
    .put(seatController.allocateSeat);

router.route('/deallocateSeat')
    .put(seatController.deallocateSeat);

module.exports = router;