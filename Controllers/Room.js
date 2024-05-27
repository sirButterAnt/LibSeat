const Rooms = require("../Models/RoomTable.js");


    
exports.createRoom = async(req, res) =>  {
    // Validate room data (optional)
    try{
        const msg = req.body;
        await Rooms.create({
            roomName: msg.roomName,
            roomCondition: msg.roomCondition
        });
        console.log("room is created");
        res.status(200).json({message : "room is successfully created"});
    }catch{
        console.error('Error saving room to database:', error);
        res.status(400).json({message : 'Error saving room to database:', error})
    }
}


exports.getRoomByName = async(req, res) =>{
    try {
        const msg = req.body;
        const room = await Rooms.findOne({where:{
            roomName: msg.roomName}
        });
        console.log("room is found");
        res.status(200).json(room);
    } catch (error) {
        console.error("Error getting room:", error);
        res.status(400).json({message : "Error getting room:", error});
    }
}

exports.setRoom = async(msg) =>{
    try {
        const msg = req.body;
        const room = await Rooms.findOne({where:{
            roomName: msg.roomName}
        });
        room.update(msg);
        console.log("room is find");
        res.status(200).json({message : "room is find"});
    } catch (error) {
        console.error("Error getting room:", error);
        res.status(400).josn({message : "Error getting room:", error});
    }
}



exports.deleteRoom = async(msg) =>{
    try { 
        const msg = req.body;
        Rooms.destroy({where :{roomName : msg.roomName}});
        console.log("room is deleted");
        res.status(200).json({message : "room is deleted"});
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(400).josn({message : "Error deleting room:", error});
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


