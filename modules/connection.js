//Настройки базы данных
const mongoose = require('mongoose');
const url = require('../config').mongoUrl;
let connection;

module.exports = async (req, next) => {
    try{
        if (!connection) connection = await mongoose.connect(url);
        next()
    }catch(err){
        console.log(err)
    }
}
