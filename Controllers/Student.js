const Students = require("../Models/StudentTable.js");

    

exports.createStudent = async (req, res) => {//////////////
    const msg = req.query;
    //const file = req.body;
    //const filePath = path.join('..', 'Files', student.filename);
    try{
        await Students.create({ 
        mail: msg.mail,
        studentName : msg.studentName,
        IDcardPath : filePath,
        studentNumber : msg.studentNumber,
        deallocationTime : msg.deallocationTime,
        allocationTime : msg.allocationTime,
        password : msg.password,
        seatId : msg.seatId,
        phoneNumber : msg.phoneNumber,
        registerCondition : "initiated"
        })
        console.log("Student created");
        res.status(200).json({message: "Student created"});
    }catch{
        console.error("Error creating student:", error);
        res.status(400).json({message: "Error creating student:", error});
    }
}

exports.registerStudent = async (req, res) =>{
    try{
        const msg = req.body; 
        const student = await Students.find({ 
        mail: msg.mail
        })
        await student.update({
            registerCondition: "registered",      
        });
        console.log("Student registered by admin");
        res.status(200).json({message : "Student registered"});
    }catch{
        console.error("Error registering student:", error);
        res.status(400).json({message: "Error registering student:", error});
       
    }
}

exports.disapproveStudent = async (req, res) => {
    try{
        const msg = req.body;
        const student = await Students.find({ 
        mail: msg.mail
        });
        await student.update({
            registerCondition: "disapproved", 
            feedback : msg.feedback     
        });
        console.log("Student disapproved by admin");  ///////////mail
        res.status(200).json({message : "Student disapproved by admin"});
    }catch{
        console.error("Error disapproving student:", error);
        res.status(400).json({message : "Error disapproving student:", error});
    }
}

exports.deleteStudent = async (req, res) => {////file should also be deleted
    try{
        const msg = req.body;
        const student = await Students.find({ 
        mail: msg.mail
        })
        await student.destroy({where:{mail : msg.mail}
        });
        console.log("Student deleted by admin");  ///////////mail
        res.status(200).json({message : "Student deleted by admin"});
    }catch{
        console.error("Error destroying student:", error);
        res.status(400).json({message : "Error destroying student:", error}) ;
    }
}

exports.getStudent = async (req, res) => {
    try{
        const msg = req.body;
        const student = await Students.find({ 
        mail: msg.mail
        })
        console.log(student);  ///////////mail
        res.status(200).json(student);
    }catch{
        console.error("Error finding student:", error);
        res.status(400).json({message :"Error finding student:", error})
    }
}

exports.setStudent = async(req, res) => {
    try {
        const msg = req.body;
        const student = await Seats.findOne({where:{
            mail : msg.mail}
        });
        student.update(msg);
        console.log("seat is updated");
        res.status(200).json({message : "seat is updated"}, error);
    } catch (error) {
        console.error("Error updating seat:", error);
        res.status(400).json({message : "Error updating seat:", error})
    }
}

exports.getWorkingTime = async(req, res) => {
    try {
        const msg = req.body;
        const student = await Students.findOne({where:{
            mail: msg.student.mail}
        });
        if (msg.status === "Allocated"){
            const currentTime = new Date();
            const hours = String(currentTime.getHours()).padStart(2, '0');
            const minutes = String(currentTime.getMinutes()).padStart(2, '0');
            const seconds = String(currentTime.getSeconds()).padStart(2, '0');
            const formattedTime = `${hours}:${minutes}:${seconds}`;
            const result = formattedTime - student.allocationTime;
            console.log(result);
            req.status(200).json(result);
        }
        else {
            res.status(400).json(result);
        }
    } catch (error) {
        console.error("Error occured while getting workgin time", error);
        res.status(400).json({message : "Error occured while getting workgin time", error})
    }
}
// Additional methods for managing student information (optional)

exports.getUnregisteredStudents = async() => {
    try {
        const student = await Students.findAll({where : {registerCondition : "initiated" }});
        console.log(student);
        req.status(200).json(student);
    } catch (error) {
        console.error("Error occured while getting workgin time", error);
        res.status(400).json({message : "Error occured while getting workgin time", error})
    }
}

exports.dontAcceptStudent = async(req, res) => { //////mail
    try {
        const msg = req.body;
        const student = await Students.findAll({where : {mail: msg.mail}});
        await student.destroy({where:{mail : msg.mail}});
        console.log(student);
        res.status(200).json({message :"student is not accepted"})
    } catch (error) {
        console.error("Error occured while getting workgin time", error);
        res.status(400).json({message : "Error occured while getting workgin time", error});
    }
}




