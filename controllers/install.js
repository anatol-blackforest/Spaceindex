//устанавливаем админа для приложения
const {Admin} = require('../models');
const {alreadyInst, enterLogPass, enterLogin, enterPass, passLengthHint, success, installed} = require('../config/messages');
const {passLength} = require('../config');
const crypto = require('./crypto');

module.exports = async (req, res, type) => {
    try{
        let body = req.body
        switch(type){
            case "get" : 
                res.render("install", {isAdmin: req.isAuthenticated() })
                break
            case "post" : {
                //проверяем есть ли адмиин
                const array = await Admin.find()
                //если аккаунт уже был установлен
                if (array.length !== 0) res.render("install", {hint: alreadyInst}); 
                //если форма незаполнена
                else if (body && !body.adminname && !body.password)  res.render("install", {hint: enterLogPass})
                //Если нет логина
                else if (body && !body.adminname) res.render("install", {hint: enterLogin}) 
                //Если нет пароля
                else if (body && !body.password) res.render("install", {hint: enterPass}) 
                //Если пароль меньше установленной длинны
                else if (body && body.password.length < passLength) res.render("install", {hint: passLengthHint(passLength)}) 
                //длинна пароля НЕ менее 4 символов
                else if (body && body.adminname.length > 0 && body.password.length > 3){
                    let adminAccount = {}
                    adminAccount.adminname = body.adminname;
                    adminAccount.password = await crypto(body.password);
                    let admin = new Admin(adminAccount);
                    await admin.save(adminAccount)
                    res.render("install", {hint: success, isAdmin: req.isAuthenticated()})
                }
            }
        }
    }catch(err){
        res.render("error", {isAdmin: req.isAuthenticated() }) 
        console.error(err)
    }
};
