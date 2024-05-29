const express = require('express');
const bodyParser = require('body-parser');



const app = express();
app.use(bodyParser.json());



const adminRoutes = require('./Routes/adminRoutes');
const roomRoutes = require('./Routes/roomRoutes');
const seatRoutes = require('./Routes/seatRoutes');
const StudentRoutes = require('./Routes/studentRoutes');


app.use('/LibSeat',adminRoutes);
app.use('/LibSeat', roomRoutes);
app.use('/LibSeat', seatRoutes);
app.use('/LibSeat', StudentRoutes);

app.listen(4000, () => {
    console.log( "listening on 4000");
})