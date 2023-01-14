const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { hash } = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/register',(req,res,next)=>{
    User.findOne({username:req.body.username})
        .then(user => {
            if(user != null){
                let err = new Error('Username ${req.body.username} already registered.')
                return next(err)
            }
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if (err) return next(err)
                user = new User()
                user.firstname = req.body.firstname
                user.lastname = req.body.lastname
                user.username = req.body.username
                user.password = hash
                user.email = req.body.email
                if(req.body.role) user.role = req.body.role
                user.save().then(user => {
                    res.status(201).json({
                        'status':'User Registration Success',
                        userId: user._id,
                        firstname:user.firstname,
                        lastname: req.body.lastname,
                        username: user.username,

                        role: user.role,
                        email:user.email
                    })
                }).catch(next)
            })
        }).catch(next)
})
router.post('/login',(req,res,next)=>{
    User.findOne({username: req.body.username})
    .then(user => {
        if(user== null){
            let err= new Error('User is not registered.')
            return next(err)
            
        }
        bcrypt.compare(req.body.password, user.password,
            (err,success)=> {
                if(err) return next(err)
                if(!success){
                    let err = new Error ('Password does not match.')
                    return next(err)
                }
                let data = {
                    userId : user._id,
                    username: user.username,
                    role: user.role
                }
                jwt.sign(data,process.env.SECRET,{expiresIn: '1d'},
                (err,token)=>{
                    if(err) return next(err)
                    res.json({
                        status : 'Login Successfull',
                        token : token
                    })
                })
            })
        
    }).catch(next)
})
module.exports = router