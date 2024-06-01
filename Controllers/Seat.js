
const Seats = require("../Models/SeatTable.js");
const Students = require("../Models/StudentTable");
const StudentRegister = require("../Models/StudentRegisterTable.js")

exports.createSeat = async (req, res) => {
    try {
        const msg = req.body;
        const seat = await Seats.findOne({
            where: {
                roomName: msg.roomName, seatId: msg.seatId
            }
        });
        if (!seat) {
            await Seats.create({
                seatId: msg.seatId,
                seatStatus: "Empty",
                roomName: msg.roomName
            })
            console.log("seat is created");
            res.status(200).json({ message: "seat is created" });
        } else {
            seat.update({
                seatId: msg.seatId,
                seatStatus: msg.seatStatus,
                studentMail: msg.studentMail,
                allocationTime: msg.allocationTime,
                deallocationTime: msg.deallocationTime,
                roomName: msg.roomName
            });
            console.log("seat is updated");
            res.status(200).json({ message: "seat is updated" });
        }

    } catch (error) {
        console.error("Error setting seat:");
        res.status(400).json({ message: "Error setting seat:" });
    }
}

exports.getSeats = async (req, res) => {
    try {
        const msg = req.body;
        const seats = await Seats.findAll({
            where: {
                roomName: msg.roomName
            }
        });

        // Transform the array into an object
        const seatsObject = {};
        seats.forEach(seat => {
            seatsObject[seat.seatId] = seat;
        });

        console.log("Seats found");
        res.status(200).json(seatsObject);
    } catch (error) {
        console.error("Error getting seats:", error);
        res.status(400).json({ message: "Error getting seats" });
    }
};
exports.getSeat = async (req, res) => {
    try {
        const msg = req.body;
        const seat = await Seats.findOne({
            where: {
                roomName: msg.roomName, seatId: msg.seatId
            }
        });
        console.log("seat is find");
        res.status(200).json(seat);
    } catch (error) {
        console.error("Error geting seat: ");
        res.status(400).json({ message: "Error geting seat: " });
    }
}



exports.deleteSeat = async (req, res) => {
    try {
        const msg = req.body;
        seat = await Seats.findOne({ where: { seatId: msg.seatId, roomName: msg.roomName } });
        if (!seat) {
            console.error("seat is not found:");
            res.status(400).json({ message: "seat is not found:" });
        } else {
            Seats.destroy({ where: { seatId: msg.seatId, roomName: msg.roomName } });
            console.log("seat is deleted");
            res.status(200).json({ message: "seat is deleted" });
        }

    } catch (error) {
        console.error("Error deleting seat:");
        res.status(400).json({ message: "Error deleting seat:" });
    }
}

exports.setSeat = async (req, res) => {
    try {
        const msg = req.body;
        const seat = await Seats.findOne({
            where: {
                roomName: msg.roomName, seatId: msg.seatId
            }
        });
        if (!seat) {
            console.error("seat is not found:");
            res.status(400).json({ message: "seat is not found:" });
        } else {
            seat.update(msg);
            console.log("seat is updated");
            res.status(200).json({ message: "seat is updated" });
        }
    } catch (error) {
        console.error("Error setting seat:", error);
        res.status(400).json({ message: "Error setting seat:" });
    }
}
/*
exports.getWorkigTime = async(req, res) => {
    try {
        const msg = req.body;
        const seat = await Seats.findOne({where:{
            roomName: msg.roomName, seatId : msg.seatId}
        });

        if (seat.seatStatus === "Allocated") {
            const currentTime = new Date();
            const allocationTime = new Date(seat.allocationTime); // Ensure this is a Date object
        
            // Calculate the difference in milliseconds
            console.log("aaaa   ");
            console.log(currentTime);
            console.log("bbbbbbb    ");
            console.log(allocationTime);
            const timeDifference = currentTime - allocationTime;
        
            // Convert the difference to a more readable format (e.g., seconds, minutes, hours)
            const differenceInSeconds = Math.floor(timeDifference / 1000);
            const differenceInMinutes = Math.floor(differenceInSeconds / 60);
            const differenceInHours = Math.floor(differenceInMinutes / 60);
            const remainingMinutes = differenceInMinutes % 60;
            const remainingSeconds = differenceInSeconds % 60;
        
            // Create a formatted result
            const formattedResult = `${differenceInHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;
        
            console.log(currentTime.toLocaleTimeString()); // Logs the current time in a readable format
            console.log(formattedResult); // Logs the time difference in a readable format
            res.status(200).json(formattedResult); // Sends the result as a JSON response
        }
                else {
            res.status(400).json({message : "empty"});
        }
    } catch (error) {
        console.error("Error occured while getting workgin time", error);
        res.status(400).json({message : "Error occured while getting workgin time", error});
    }
}
*/
exports.allocateSeat = async (req, res) => {
    try {

        const msg = req.body;
        console.log(msg);
        const seat = await Seats.findOne({
            where: {
                roomName: msg.roomName, seatId: msg.seatId
            }
        });
        const student = await StudentRegister.findOne({
            where: {
                mail: msg.mail
            }
        })
        const now = new Date();
        if (seat.seatStatus === "Empty" && student.Id === 0) {
            await seat.update({ seatStatus: "Allocated", studentMail: msg.mail, allocationTime: msg.allocationTime });
            await Students.create({ mail: msg.mail, allocationTime: now, status: "Allocated", seatId: msg.seatId });
            std = await Students.findOne({ where: { mail: msg.mail, status: "Allocated" } });
            await student.update({ Id: std.id });
            res.status(200).json({ message: "Seat succesfully allocated" });
            console.log({ message: "Seat succesfully allocated" });
        } else {
            res.status(400).json({ message: "Seat is already allocated" });
            console.log({ message: "Seat is already allocated" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error allocating seat" });
    }
}

exports.deallocateSeat = async (req, res) => {
    try {
        const msg = req.body;
        const seat = await Seats.findOne({
            where: {
                roomName: msg.roomName, seatId: msg.seatId
            }
        });

        const student = await StudentRegister.findOne({
            where: {
                mail: seat.studentMail
            }
        })
        if (seat.seatStatus === "Allocated" && student.Id !== 0) {
            await seat.update({ seatStatus: "Empty", studentMail: "", allocationTime: "" });
            std = await Students.findOne({ id: student.Id });
            await std.update({ status: "Deallocated" });
            await student.update({ Id: 0 });
            res.status(200).json({ message: "Seat succesfully deallocated" });
            console.log({ message: "Seat succesfully deallocated" });
        } else {
            res.status(400).json({ message: "Seat is not allocated" });
            console.log({ message: "Seat is not allocated" });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error deallocating seat:" })
    }
}


