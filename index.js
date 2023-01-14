require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const visualRouter = require('./routes/visual-router')
const categoryRouter = require('./routes/category-router')
const userRouter = require('./routes/user-router')
const profileRouter = require('./routes/profile-router')
const auth = require('./middleware/auth')
const app = express()

// connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/lookbook101')
.then(() => {
    console.log("Connected to MongoDB Database server")
}).catch((err) => console.log(err))

//1. Application level middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()

})   

//3. In-built middleware 
app.use(express.json())

//2. Router level middleware
app.use('/users',userRouter)
app.use(auth.verifyUser)
// app.use('/profile',profileRouter)
app.use('/visual', visualRouter)
app.use('/category',categoryRouter)

//4. Error Handling middleware

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).json({'err': err.message})
})

app.listen(3000, () => {
    console.log(` Running On 3000.`)
})

app.get("/", (req,res)=> {
    console.log(`${req.method} ${req.path}`)
    res.send("Hello World")
})

