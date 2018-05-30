//изменяем небесное тело
let {Planet, Moon} = require('./schema.js');

module.exports = async ({body, file}, res) => {
    try{




        res.redirect(`/`);




    }catch(err){
        console.log(err)
        res.render('index', { title: err });
    }
}
