//Подключение к базе данных
const mongoose = require('mongoose');
const {mongoUrl} = require('../config');
let connection;

module.exports = async (req, next) => {
    try{
        if (!connection) connection = await mongoose.connect(mongoUrl);
        next()
    }catch(err){
        console.log(err)
    }
}
