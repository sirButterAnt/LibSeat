const Rooms = require("../Models/RoomTable.js");



    
exports.createRoom = async(msg) =>  {
    // Validate room data (optional)
    try{
        await Rooms.create({
            roomName: msg.roomName,
            roomCondition: msg.roomCondition
        });
        console.log("room is created");
        return {message : "room is successfully created"};
    }catch{
        console.error('Error saving room to database:', error);
        throw error;  
    }
}


exports.getRoomByName = async(msg) =>{
    try {
        const room = await Rooms.findOne({where:{
            roomName: msg.roomName}
        });
        console.log("room is found");
        return room;
    } catch (error) {
        console.error("Error getting room:", error);
        throw error; // Re-throw error for handling at higher level
    }
}

exports.setRoom = async(msg) =>{
    try {
        const room = await Rooms.findOne({where:{
            roomName: msg.roomName}
        });
        room.update(msg);
        console.log("room is find");
        return {message : "room condition changed"};
    } catch (error) {
        console.error("Error getting room:", error);
        throw error; // Re-throw error for handling at higher level
    }
}



exports.deleteRoom = async(msg) =>{
    try { 
        Rooms.destroy({where :{roomName : msg.roomName}});
        console.log("room is deleted");
        return {message : "room is deleted"};;
    } catch (error) {
        console.error("Error deleting room:", error);
        throw error; // Re-throw error for handling at higher level
    }
}


exports.getAllRooms = async(msg) =>{
    try {
        const rooms = await Rooms.findAll();
        console.log("rooms are found");
        return rooms;
    } catch (error) {
        console.error("Error getting rooms:", error);
        throw error; // Re-throw error for handling at higher level
    }
}


