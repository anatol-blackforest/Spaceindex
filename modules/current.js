//подробная информация об искомой планете или спутнике
let {Planet, Moon} = require('./schema.js');

module.exports = async ({params: {title}}, res, category) => {
    try{
        let object
        switch(category){
            //планета
            case "planets" : {
                object = await Planet.findOne({title}).populate('moons')
                break
            }
            //спутник
            case "moons" : {
                object = await Moon.findOne({title})
                break
            }
        }
        //если планеты не нашли - попадаем в сумеречную зону 404 :)
        if(!object) throw new Error()
        res.render('single', { object, category });
    }catch(err){
        console.log(err)
        res.render('error');
    }
}
