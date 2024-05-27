
const Seats = require("../Models/SeatTable.js");



exports.getSeats = async (req, res)=>{
    try {
        const msg = req.body;
        const seats = await Seats.findAll({where :{
            roomName: msg.roomName}
        });
        console.log("seats are find");
        res.status(200).json(seats);
    } catch (error) {
        console.error("Error geting seats:", error);
        res.status(400).json({message : "Error geting seats:", error});
    }
}
exports.getSeat = async (req, res)=>{
    try {
        const msg = req.body;
        const seat = await Seats.findOne({where :{
            roomName: msg.roomName, seatId : msg.seatId}
        });
        console.log("seat is find");
        res.status(200).json(seat);
    } catch (error) {
        console.error("Error geting seat: ", error);
        res.status(400).json({message : "Error geting seat: ", error});
    }
}

exports.deleteSeat = async (req, res) => {
    try {
        const msg = req.body;
        Seats.destroy({where :{seatId : msg.seatId, roomName : msg.seatId}});
        console.log("seat is deleted");
        res.status(200).json({message : "seat is deleted"});
    } catch (error) {
        console.error("Error deleting seat:", error);
        res.status(400).json({message : "Error deleting seat:", error});
    }
}
 
exports.setSeat = async (req, res) => {
    try {
        const msg = req.body;
        const room = await Seats.findOne({where:{
            roomName: msg.roomName, seatId : msg.seatId}
        });
        room.update(msg);
        console.log("seat is updated");
        res.status(200).json({message : "seat is updated"});
    } catch (error) {
        console.error("Error setting seat:", error);
        res.status(400).json({message : "Error setting seat:", error});
    }
}

exports.getWorkingTime = async(req, res) => {
    try {
        const msg = req.body;
        const seat = await Seats.findOne({where:{
            roomName: msg.roomName, seatId : msg.seatId}
        });

        if (seat.status === "Allocated"){
            const currentTime = new Date();
            const hours = String(currentTime.getHours()).padStart(2, '0');
            const minutes = String(currentTime.getMinutes()).padStart(2, '0');
            const seconds = String(currentTime.getSeconds()).padStart(2, '0');
            const formattedTime = `${hours}:${minutes}:${seconds}`;
            const result = formattedTime - room.allocationTime;
            console.log(result);
            res.status(200).json(result);
        }
        else {
            res.status(400).json({message : "empty"});
        }
    } catch (error) {
        console.error("Error occured while getting workgin time", error);
        res.status(400).json({message : "Error occured while getting workgin time", error});
    }
}

exports.allocateSeat = async(req, res) => {
        try {
            const msg = req.body;
            const seat = await Seats.findOne({where:{
                roomName: msg.roomName, seatId : msg.seatId}
            });
            seat.update({seatStatus : "Allocated"})
            console.log();
            res.status(200).json({message : "seat is allocated"});
        } catch (error) {
            console.error("Error allocating seat", error);
            res.status(400).json({message : "Error allocating seat", error});
        }
    }

exports.deallocateSeat = async (req, res) => {
    try {
        const msg = req.body;
        const seat = await Seats.findOne({where:{
            roomName: msg.roomName, seatId : msg.seatId}
        });
        seat.update({seatStatus : "Empty"})
        console.log("Seat is deallocated");
        res.status(200).json({message : "Seat is deallocated"})
    } catch (error) {
        console.error("Error deallocating seat:", error);
        res.status(400).json({message: "Error deallocating seat:", error})
    }
}


