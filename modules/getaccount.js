//считываем админаккаунт с базы для сравнения с данными авторизации
const {Admin} = require('./schema.js');
const {noAuth} =  require('./messages');
const crypto = require('./crypto');

module.exports = async (req, adminname, password, done) => {
    try{
        password = crypto(password)
        let admin = await Admin.findOne({adminname, password})
        return (admin) ? done(null, admin) : done(null, false)
    }catch(err){
        done(null, false)
        console.error(err)
    }
};
