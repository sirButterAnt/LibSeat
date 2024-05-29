
const Seats = require("../Models/SeatTable.js");



exports.createSeat = async (req, res) => {
    try {
        const msg = req.body;
        const seat = await Seats.findOne({where:{
            roomName: msg.roomName, seatId : msg.seatId}
        });
        if(!seat){
            await Seats.create({
            seatId: msg.seatId,
            seatStatus: "Empty",
            studentMail: msg.studentMail,
            allocationTime: msg.allocationTime,
            deallocationTime: msg.deallocationTime,
            roomName: msg.roomName})
        }else{
            seat.update({
                seatId: msg.seatId,
                seatStatus: msg.seatStatus,
                studentMail: msg.studentMail,
                allocationTime: msg.allocationTime,
                deallocationTime: msg.deallocationTime,
                roomName: msg.roomName
               });
        }
        console.log("seat is updated");
        res.status(200).json({message : "seat is updated"});
    } catch (error) {
        console.error("Error setting seat:", error);
        res.status(400).json({message : "Error setting seat:", error});
    }
}

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
        Seats.destroy({where :{seatId : msg.seatId, roomName : msg.roomName}});
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
        const seat = await Seats.findOne({where:{
            roomName: msg.roomName, seatId : msg.seatId}
        });
        seat.update(msg);
        console.log("seat is updated");
        res.status(200).json({message : "seat is updated"});
    } catch (error) {
        console.error("Error setting seat:", error);
        res.status(400).json({message : "Error setting seat:", error});
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
exports.allocateSeat = async(req, res) => {
        try {
            
            const msg = req.body;
            console.log(msg);
            const seat = await Seats.findOne({where:{
                roomName: msg.roomName, seatId : msg.seatId}
            });
            if (seat.seatStatus === "Empty"){
                seat.update({seatStatus : "Allocated"}) ;
                res.status(200).json({message: "Seat succesfully allocated"});
                console.log({message: "Seat succesfully allocated"});
            }else{
                res.status(400).json({message: "Seat is already allocated"});
                console.log({message: "Seat is already allocated"});
            }
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
        if (seat.seatStatus === "Allocated"){
            seat.update({seatStatus : "Empty"});
        }else {
            res.status(400).json({message: "Seat is not allocated"});
            console.log({message: "Seat is not allocated"});
        }
        console.log("Seat is deallocated");
        res.status(200).json({message : "Seat is deallocated"})
    } catch (error) {
        console.error("Error deallocating seat:", error);
        res.status(400).json({message: "Error deallocating seat:", error})
    }
}


