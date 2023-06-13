const express = require('express')
/*const employeRoutes = require("./routes/employe")*/
const userRoutes = require('./routes/user')
const typeCongeRoutes = require('./routes/typeConge')
const congeRoutes = require('./routes/conge')
const accountRoutes = require('./routes/account')
const mongoose = require('mongoose')
require('dotenv').config()


//express app
const app = express()

//middlware
app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next();
})

//routes
/*app.use('/Employe',employeRoutes)*/
app.use('/api/user', userRoutes);
app.use('/api/typeConge', typeCongeRoutes);
app.use('/api/conge', congeRoutes);
app.use('/api/account',accountRoutes);

//connect to db
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT, ()=>{
            console.log('connected to DB and listening on port ',process.env.PORT)
        })

    })
    .catch((error) => {
      console.log(error)  
    })

