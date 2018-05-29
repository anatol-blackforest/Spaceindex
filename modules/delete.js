let {Planet, Moon} = require('./schema.js');
const {regexp} = require('../config');

module.exports = async ({params: {title}}, res, category) => {
    try{
        switch(category){
            case "planets" : {
                const result = await Planet.findOneAndRemove(title);
                console.log(result)
                res.redirect('/planets');
                break
            }
            case "moons" : {
                const result = await Moon.findOneAndRemove(title);
                console.log(result)
                res.redirect('/moons');
                break
            }
        }
    }catch(err){
        console.log(err)
        res.redirect('/');
    }
}
