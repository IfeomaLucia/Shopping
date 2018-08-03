var User = require('../Models/User');

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.addUser = function(req, res, next){
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length) {
            res.status(409).json({
                message: 'Mail already exists'
            })
        } else {
            bcrypt.hash(req.body.password, 10, function(err, hash){
                if(err){
                    res.status(500).json({
                        error: err
                    })
                } else {
                    var user = new User({
                        _id: mongoose.Types.ObjectId(), 
                        email: req.body.email,
                        password: hash 
                    })
                    user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'User created successfully'
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    })
                }
            })
        }
    })
}

exports.deleteUser = function(req, res, next){
    var id = req.params.id;
    User.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

exports.logInUser = function(req, res, next){
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            if(result) {
                var token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id 
                }, 
               'tyuuhuhu',
                {
                    expiresIn: "1h"
                },
                );
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                })
            }
            return res.status(401).json({
                message: 'Auth failed'
            })
        })
     })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}