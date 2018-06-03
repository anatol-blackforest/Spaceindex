//подробная информация об искомой планете или спутнике
const {Planet, Moon} = require('./schema.js');

module.exports = async (req, res, isAdmin, category) => {
    try{
        let object, title = req.params.title
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
        res.render('single', { object, category, isAdmin });
    }catch(err){
        console.log(err)
        res.render('error', {isAdmin});
    }
}
