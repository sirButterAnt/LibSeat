const Students = require("../Models/StudentTable.js");

    
exports.createStudent = async (msg, file) => {//////////////
    const filePath = path.join('..', 'Files', student.filename);
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
        return {message : "Student created"};
    }catch{
        console.error("Error creating student:", error);
        throw error; // Re-throw error for handling at higher  
    }
}

exports.registerStudent = async (msg) =>{
    try{
        const student = await Students.find({ 
        mail: msg.mail
        })
        await student.update({
            registerCondition: "registered",      
        });
        console.log("Student registered by admin");
        return {message : "Student registered"};
    }catch{
        console.error("Error registering student:", error);
        throw error; // Re-throw error for handling at higher  
    }
}

exports.disapproveStudent = async (msg) => {
    try{
        const student = await Students.find({ 
        mail: msg.mail
        })
        await student.update({
            registerCondition: "disapproved", 
            feedback : msg.feedback     
        });
        console.log("Student disapproved by admin");  ///////////mail
        return {message : "Student disapproved"};
    }catch{
        console.error("Error disapproving student:", error);
        throw error; // Re-throw error for handling at higher  
    }
}

exports.deleteStudent = async (msg) => {////file should also be deleted
    try{
        const student = await Students.find({ 
        mail: msg.mail
        })
        await student.destroy({where:{mail : msg.mail}
        });
        console.log("Student deleted by admin");  ///////////mail
        return {message : "Student deleted"};
    }catch{
        console.error("Error destroying student:", error);
        throw error; // Re-throw error for handling at higher  
    }
}

exports.getStudent = async (msg) => {
    try{
        const student = await Students.find({ 
        mail: msg.mail
        })
        console.log(student);  ///////////mail
        return student;
    }catch{
        console.error("Error finding student:", error);
        throw error; // Re-throw error for handling at higher  
    }
}

exports.setStudent = async(msg) => {
    try {
        const student = await Seats.findOne({where:{
            mail : msg.mail}
        });
        student.update(msg);
        console.log("seat is updated");
        return {message : "seat is updated"};;
    } catch (error) {
        console.error("Error updating seat:", error);
        throw error; // Re-throw error for handling at higher level
    }
}

exports.getWorkingTime = async(msg) => {
    try {
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
            return result;}
        else {
            throw new error("Empty");
        }
    } catch (error) {
        console.error("Error occured while getting workgin time", error);
        throw error; // Re-throw error for handling at higher level
    }
}
// Additional methods for managing student information (optional)

exports.getUnregisteredStudents = async() => {
    try {
        const student = await Students.findAll({where : {registerCondition : "initiated" }});
        console.log(student);
        return student;
    } catch (error) {
        console.error("Error occured while getting workgin time", error);
        throw error; // Re-throw error for handling at higher level
    }
}

exports.dontAcceptStudent = async(msg) => { //////mail
    try {
        const student = await Students.findAll({where : {mail: msg.mail}});
        await student.destroy({where:{mail : msg.mail}});
        console.log(student);
        return {message : "studen is not accepted"};
    } catch (error) {
        console.error("Error occured while getting workgin time", error);
        throw error; // Re-throw error for handling at higher level
    }
}




