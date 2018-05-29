//изменяем небесное тело
let {Planet, Moon} = require('./schema.js');

module.exports = async ({body}, res) => {
    try{
        res.redirect(`/`);
    }catch(err){
        console.log(err)
        res.redirect(`/`);
    }
}
