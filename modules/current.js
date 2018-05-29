let {Planet, Moon} = require('./schema.js');

module.exports = async ({params: {title}}, res, category) => {
    try{
        let object
        switch(category){
            case "planets" : {
                object = await Planet.findOne({title}).populate('moons')
                break
            }
            case "moons" : {
                object = await Moon.findOne({title})
                break
            }
        }
        if(!object) throw new Error()
        res.render('single', { object, category });
    }catch(err){
        console.log(err)
        res.render('error');
    }
}
