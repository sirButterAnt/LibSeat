const Students = require("../Models/StudentTable.js");
const StudentRegister = require("../Models/StudentRegisterTable.js")
const nodemailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const JWT = require('../utils/jwt.js');
const jwt = new JWT();
const Sequelize = require('sequelize');
const { error } = require("console");
const generateVerifyToken = require('../utils/generateVerifyToken.js');
const { verify } = require("crypto");

exports.login = async (req, res) => {
    try {
        const user = await StudentRegister.findOne({ where: { mail: req.body.mail } });
        if (!user) {
            return res.status(401).json({ status: 'fail', message: 'Email or password is wrong' });

        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(401).json({ status: 'fail', message: 'Email or password is wrong' })
        }
        // generate token
        const token = jwt.generateToken(user);

        // set cookies

        res.cookie('token', token, { httpOnly: true, secure: true });

        res.status(200).json({
            status: 'success',
            loggedUser: user,

        });




    } catch (error) {
        console.log(error);
        return res.status(400).json({ status: 'fail', error: error })
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {


        cb(null, './Files');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Allow file upload
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'));
    }
};

const upload = multer({ storage: storage });


exports.createStudent = async (req, res) => {//////////////
    const msg = req.body;
    //const file = req.body;
    //const filePath = path.join('..', 'Files', student.filename);
    try {
        const token = generateVerifyToken.generateToken(24);
        await StudentRegister.create({
            mail: msg.mail,
            studentName: msg.studentName,
            IDcardPath: "Files",
            studentNumber: msg.studentNumber,
            password: msg.password,
            phoneNumber: msg.phoneNumber,
            registerCondition: "initiated",
            IDcardPath: "files/" + msg.mail + ".jpg",
            Id: 0,
            verifyToken:token
        })
        console.log("Student created");
        res.status(200).json({ message: "Student created" });
        await sendMail(msg.mail, 'LibSeat account verify link', 'LibSeat account verify link', 'LibSeat account verify link',`http://localhost:3000/verifyLink/${token}`);

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error creating student:" });
    }
}

exports.registerStudent = async (req, res) => {
    try {
        const msg = req.body;
        const student = await StudentRegister.findOne({
            where: {
                mail: msg.mail
            }
        })
        if (!student) {
            res.status(400).json({ message: "student not found:" });
            console.log("student not found:");
        } else if (student.registerCondition === "registered") {
            console.log("Student has already registered");
            res.status(200).json({ message: "Student has already registered" });
        }
        else if (student.registerCondition === "initiated") {
            await student.update({ registerCondition: "registered" });
            console.log("Student registered by admin");
            res.status(200).json({ message: "Student registered" });
            sendMail(msg.mail, "LibSeat register approved", "You register request approved by admin", "You register request approved by admin")
        }

    } catch (error) {
        console.error("Error registering student:");
        res.status(400).json({ message: "Error registering student:" });

    }
}

exports.disapproveStudent = async (req, res) => {
    try {
        const msg = req.body;
        const student = await StudentRegister.findOne({
            where: {
                mail: msg.mail
            }
        });
        if (!student) {
            res.status(400).json({ message: "student not found:" });
            return;
        } else if (student.registerCondition === "disapproved") {
            console.log("Student has already disapproved");
            res.status(200).json({ message: "Student has already disapproved" });
        }
        else if (student.registerCondition === "initiated") {
            await student.update({ registerCondition: "disapproved" });
            console.log("Student disapproved by admin");
            res.status(200).json({ message: "Student disapproved by admin" });
            sendMail(msg.mail, "LibSeat register dissaproved", "trying to register LibSeat(iyte library management system is failed)", msg.feedback)
        }

    } catch (error) {
        console.error("Error disapproving student:");
        res.status(400).json({ message: "Error disapproving student:" });
    }
}

exports.deleteStudent = async (req, res) => {////file should also be deleted
    try {
        const msg = req.body;
        const student = await StudentRegister.findOne({
            where: {
                mail: msg.mail
            }
        })
        if (!student) {
            res.status(400).json({ message: "student not found:" });
            console.error("student not found");
        } else {
            console.log("Student deleted");
            await student.destroy({ mail: msg.mail });
            res.status(200).json({ message: "Student deleted" });
        }

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error destroying student:" });
    }
}

exports.registeredStudents = async (req, res) => {
    try {

        const students = await StudentRegister.findAll({ where: { registerCondition: "registered" } });
        if (!students) {
            console.error("no student found:");
            res.status(400).json({ message: "No student found" });
        } else {
            console.log(students);  ///////////mail
            res.status(200).json(students);
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "No student found" });
    }
}




exports.getStudent = async (req, res) => {
    try {
        const msg = req.body;
        const student = await Students.findOne({ where: { mail: msg.mail, status: "Allocated" } });

        if (student) {
            console.log(student);
            res.status(200).json(student);
        }
        else if (!student) {
            console.error("Student not found:");
            res.status(200).json({ message: "Student not found" });
        } else {
            console.error(student);  ///////////mail
            res.status(200).json(student);
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error finding student:" })
    }
}

exports.getStudentsLog = async (req, res) => {
    try {
        const msg = req.body;
        var student = await Students.findOne({ where: { mail: msg.mail, status: "Allocated" } });

        if (student) {
            student = await StudentRegister.findOne({
                where: {
                    mail: msg.mail, Id: student.id
                },
                include: [{
                    model: Students,
                    attributes: ['id', 'mail', 'allocationTime', 'seatId', 'status']
                }]
            });
        }
        if (!student) {
            console.error("Student not found:");
            res.status(400).json({ message: "Student not found" });
        } else {
            console.error(student);  ///////////mail
            res.status(200).json(student);
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error finding student:" })
    }
}

exports.setStudent = async (req, res) => {
    try {
        const msg = req.body;
        const student = await StudentRegister.findOne({
            where: {
                mail: msg.mail
            }
        });
        if (!student) {
            console.error("student doesn't exist");
            res.status(400).json({ message: "student doesn't exist" })
        } else {
            console.log("seat is updated");
            res.status(200).json({ message: "student is updated" });
            student.update(msg);
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error updating student:" })
    }
}


/*
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
*/
exports.getUnregisteredStudents = async (req, res) => {
    try {
        const student = await StudentRegister.findAll({ where: { registerCondition: "initiated" } });
        if (!student) {
            console.log("no student found");
            res.status(200).json({ message: "no student found" });
        } else {
            console.log(student);
            res.status(200).json(student);
        }

    } catch (error) {
        console.error("Error occured while trying to find unregistered students");
        res.status(400).json({ message: "Error occured while trying to find unregistered students" })
    }
}


async function sendMail(receiverMail, mailSubject, text, feedback,content) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'libseat.iyte@gmail.com',
            pass: 'asfz mdrv kwpl rozj'
        }
    });


    let mailOptions = {
        from: "libseat.iyte@gmail.com",
        to: receiverMail,
        subject: mailSubject,
        text: text,
        html:
            `
        <h1>${feedback}</h1>
        <b>${content}</b>
        `

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

}



exports.uploadPhoto = async (req, res) => {
    try {
        upload.single('file')(req, res, async (err) => {
            if (err) {
                console.log('Error Occured');
                res.status(400).json({ message: "an error occured while trying to upload" });
            }
        })

        res.status(200).json({ message: "Register request is succesfully sent!" });;
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: "an error occured while trying to upload" });
    }



};



exports.downloadFile = async (req, res) => {
    try {
        const msg = req.body;
        const student = await StudentRegister.findOne({ where: { mail: msg.mail } });
        console.log(student);
        filePath = student.IDcardPath;
        console.log(filePath);
        const fileName = req.params.fileName;
        res.download(filePath, fileName, (err) => {
            if (err) {
                // Handle error
                console.error('Error downloading file:', err);
                res.status(400).send('Internal Server Error');
            }
        });
    } catch {
        console.error('Error downloading file:', err);
        res.status(400).send('Internal Server Error');
    }
};
