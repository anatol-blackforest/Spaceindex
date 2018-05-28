let {Planet, Moon} = require('./schema.js');

module.exports = async ({params}, res, category) => {
    console.log("we here")
    let object
    switch(category){
        case "planets" : {
            object = await Planet.findOne({title: params.planete}).populate('moons')
            break
        }
        case "moons" : {
            object = await Moon.findOne({title: params.moon})
            break
        }
    }
    console.log(object)
    res.render('single', { object, category });
}
