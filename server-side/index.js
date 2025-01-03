const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const userRouter = require("./Routes/userRoutes");
const userDetailsRoutes = require('./Routes/userDetailsRoutes');
const donationRoutes = require('./Routes/donationRoutes');
const reviewRoutes = require('./Routes/Reviews');
const paymentRoutes = require('./Routes/paymentRoutes');
const contactRoutes = require('./Routes/contactRoutes');
const orderRoutes = require('./Routes/orderRoutes');

dotenv.config();
const port = process.env.PORT;
const mongoose = require('mongoose')


const app = express();



// middlewares

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/api", userRouter);
app.use('/api', userDetailsRoutes);
app.use('/api', donationRoutes);
app.use('/api', reviewRoutes);
app.use('/api', paymentRoutes);
app.use('/api', contactRoutes);
app.use('/api', orderRoutes);



app.get("/", (req, res) => {
    res.send("Welcome to faith planner!");
});
mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`connected to database & Server is running on port: ${port}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })
    ;
