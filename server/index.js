const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
const User = require('./model/userModel')

//middleware
const app = express();
app.use(cors());
app.use(express.json({limit: '10mb'}));

//connect db
console.log(process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL)
.then(() =>{console.log('my server connect to db')})
.catch((err) =>{console.log(err)})

//API
app.get('/',(req,res) =>{
    res.send('my app is running')
})
app.post('/signup', async (req, res) => {
    console.log(req.body);
    const { email } = req.body;

    try {
        const result = await User.findOne({ email }).exec();

        console.log(result);

        if (result) {
            res.send({
                message: 'Email id is already registered',
            });
        } else {
            const data = new User(req.body);
            const saveResult = await data.save();

            res.send({
                message: 'Successfully Signed Up',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Internal Server Error',
        });
    }
});


//connect the port
const PORT =process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`my app is running port${PORT}`)
})