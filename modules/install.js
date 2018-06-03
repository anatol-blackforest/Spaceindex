//устанавливаем админа для приложения
const {Admin} = require('./schema');
const {alreadyInst, enterLogPass, enterLogin, enterPass, passLengthHint, success, installed} = require('./messages');
const {passLength} = require('../config');
const crypto = require('./crypto');

module.exports = async ({body}, res, type) => {
    try{
        switch(type){
            case "get" : 
                res.render("install")
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
                    res.render("install", {hint: success})
                }
            }
        }
    }catch(err){
        res.render("error") 
        console.error(err)
    }
};
