//добавляем небесное тело
let {Planet, Moon} = require('./schema.js');

module.exports = async ({file, body}, res) => {
    try{
        if(file && file.filename) body.image = file.filename
        switch(body.type){
            //добавляем планету
            case "planet" : {
                delete body.type
                delete body.parentPlanet
                delete body.distanseFromParentPlanet
                let planet = new Planet(body);
                //подвешиваем готовые спутники
                planet.moons = await Moon.find({parentPlanet: body.title})
                await planet.save();
                res.redirect(`/planets/${body.title}`);
                break
            }
            //добавляем спутник
            case "moon" : {
                delete body.type
                delete body.year
                delete body.distanseFromStar
                let parentPlanet = body.parentPlanet
                let moon = new Moon(body)
                moon.parentPlanet = parentPlanet
                await moon.save()
                //вешаем спутник на орбиту материнской планеты
                let planet = await Planet.findOne({title: parentPlanet})
                planet.moons.push(moon._id)
                await Planet.update({title: parentPlanet}, {$set: planet})
                res.redirect(`/moons/${body.title}`);
                break
            }
        }
    }catch(err){
        console.log(err)
        res.render('add', { title: err });
    }
}
