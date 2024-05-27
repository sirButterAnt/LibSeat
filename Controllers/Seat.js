
const Seats = require("../Models/SeatTable.js");



exports.getSeats = async (roomName)=>{
        try {
            const seats = await Seats.findAll({where :{
                roomName: roomName,}
            });
            console.log("seats are find");
            return seats;
            
        } catch (error) {
            console.error("Error geting seats:", error);
            throw error; // Re-throw error for handling at higher level
        }
    }
exports.getSeats = async (roomName)=>{
        try {
            const seats = await Seats.findOne({where :{
                roomName: msg.roomName, seatId : msg.seatId}
            });
            console.log("seat is find");
            return seats;
            
        } catch (error) {
            console.error("Error geting seat: ", error);
            throw error; // Re-throw error for handling at higher level
        }
    }

exports.deleteSeat = async (msg) => {
        try {
            Seats.destroy({where :{seatId : msg.seatId, roomName : msg.seatId}});
            console.log("seat is deleted");
            return {message : "seat is deleted"};;
        } catch (error) {
            console.error("Error deleting seat:", error);
            throw error; // Re-throw error for handling at higher level
        }
    }

    
exports.setSeat = async (msg) => {
        try {
            const room = await Seats.findOne({where:{
                roomName: msg.roomName, seatId : msg.seatId}
            });
            room.update(msg);
            console.log("seat is deleted");
            return {message : "seat is deleted"};
        } catch (error) {
            console.error("Error deleting seat:", error);
            throw error; // Re-throw error for handling at higher level
        }
    }

exports.getWorkingTime = async(msg) => {
        try {
            
            const seat = await Seats.findOne({where:{
                roomName: msg.roomName, seatId : msg.seatId}
            });
            if (msg.status === "Allocated"){
                const currentTime = new Date();
                const hours = String(currentTime.getHours()).padStart(2, '0');
                const minutes = String(currentTime.getMinutes()).padStart(2, '0');
                const seconds = String(currentTime.getSeconds()).padStart(2, '0');
                const formattedTime = `${hours}:${minutes}:${seconds}`;
                const result = formattedTime - room.allocationTime;
                console.log(result);
                return result;}
            else {
                throw new error("Empty");
            }
        } catch (error) {
            console.error("Error occured while getting workgin time", error);
            throw error; // Re-throw error for handling at higher level
        }
    }

exports.allocateSeat = async(msg) => {
        try {
            const seat = await Seats.findOne({where:{
                roomName: msg.roomName, seatId : msg.seatId}
            });
            seat.update({seatStatus : "Allocated"})
            console.log(result);
            return {message : "seat is allocated"};;
        } catch (error) {
            console.error("Error allocating seat", error);
            throw error; // Re-throw error for handling at higher level
        }
    }

exports.deallocateSeat = async (msg) => {
    try {
        const seat = await Seats.findOne({where:{
            roomName: msg.roomName, seatId : msg.seatId}
        });

        seat.update({seatStatus : "Empty"})
        console.log(result);
        return {message : "seat is allocated"};
    } catch (error) {
        console.error("Error deallocating seat:", error);
        throw error; // Re-throw error for handling at higher level
    }
}


