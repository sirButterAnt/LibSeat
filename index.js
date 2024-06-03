const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const path = './config.env'
require('dotenv').config({ path: path });


//db
const sequelize = require('./db');


const app = express();
app.use(cors());

//json 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//cookie
app.use(cookieParser());





const StudentRoutes = require('./Routes/studentRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const roomRoutes = require('./Routes/roomRoutes');
const seatRoutes = require('./Routes/SeatRoutes');

// verify token
const StudentRegister = require("./Models/StudentRegisterTable.js")
app.get('/verifyLink/:token', async (req, res) => {
    const token = req.params.token;
    try {
        const user = await StudentRegister.findOne({ where: { verifyToken: token } });
        if (user) {
            user.registerCondition = 'registered'
            user.save();
        }
        return res.status(200).json({ message: 'success' });
    } catch (error) {
        return res.status(400).json({ message: 'bad request' });
    }
})


// logout

app.get('/logout', async (res, req) => {
    try {

        //inaktif token
        res.cookie('token', '', { httpOnly: true, maxAge: 0 });
        res.status(200).json({
            status: 'success',
            message: "logout successfull"
        })

    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
})

//routes
app.use('/LibSeat', adminRoutes);
app.use('/LibSeat', roomRoutes);
app.use('/LibSeat', seatRoutes);
app.use('/LibSeat', StudentRoutes);



//404 not found 
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})





sequelize
    .sync()
    .then(result => {
        console.log("Database connected");
        app.listen(process.env.PORT);
        console.log(process.env.PORT)
    })
    .catch(err => console.log(err, 'error handle'));