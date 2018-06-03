//считываем админаккаунт с базы для сравнения с данными авторизации
const {Admin} = require('./schema.js');
const {noAuth} =  require('./messages');
const crypto = require('./crypto');

module.exports = async (req, adminname, password, done) => {
    console.log("getAccount inside")
    try{
        console.log("getAccount inside try")
        console.log(adminname)
        console.log(password)
        password = crypto(password)
        let admin = await Admin.findOne({adminname, password})
        console.log(admin)
        return (admin) ? done(null, admin) : done(null, false, req.flash('message', noAuth))
    }catch(err){
        done(null, false)
        console.log("getAccount inside catch")
        console.error(err)
    }
};
