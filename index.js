const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const adminRoutes = require('./Routes/adminRoutes');
const roomRoutes = require('./Routes/roomRoutes');
const seatRoutes = require('./Routes/SeatRoute');
const StudentRoutes = require('./Routes/StudentRoutes');


app.use('/LibSeat',adminRoutes);
app.use('/LibSeat', roomRoutes);
app.use('/LibSeat', seatRoutes);
app.use('/LibSeat', StudentRoutes);