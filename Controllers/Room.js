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
        console.error('Error saving room to database:');
        res.status(400).json({message : 'Error saving room to database:'})
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
        console.error("Error getting room:");
        res.status(400).json({message : "Error getting room:"});
    }
}

exports.setRoom = async(req, res) =>{
    try {
        const msg = req.body;
        const room = await Rooms.findOne({where:{
            roomName: msg.roomName}
        });
        room.update(msg);
        console.log("room is set");
        res.status(200).json({message : "room is set"});
    } catch (error) {
        console.error("Error getting room:");
        res.status(400).josn({message : "Error getting room:"});
    }
}



exports.deleteRoom = async(req, res) =>{
    try { 
        const msg = req.body;
        Rooms.destroy({where :{roomName : msg.roomName}});
        console.log("room is deleted");
        res.status(200).json({message : "room is deleted"});
    } catch (error) {
        console.error("Error deleting room:");
        res.status(400).json({message : "Error deleting room:"});
    }
}


exports.getAllRooms = async(req ,res) =>{
    try {
        const rooms = await Rooms.findAll();
        console.log("rooms are found");
        if(!rooms){
            res.status(400).jsonn({message : "there are no rooms"});
            console.error("there are no rooms");
        }else{
            console.error("rooms are found:");
            res.status(200).json(rooms);
        }        
    } catch (error) {
        res.status(400).json({message : "Error finding all rooms"});
        console.error("Error getting rooms:");
    }
}


