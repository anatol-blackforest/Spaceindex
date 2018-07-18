//добавляем небесное тело
const {Planet, Moon} = require('../models');

module.exports = async (req, res) => {
    try{
        let {file, body} = req
        if (file && file.filename) body.image = file.filename
        if (body && body.title && body.description){
            switch(body.type){
                //добавляем планету
                case "planet" : {
                    let planet = new Planet(body);
                    //подвешиваем готовые спутники
                    planet.moons = await Moon.find({parentPlanet: body.title})
                    await planet.save();
                    res.redirect(`/planets/${body.title}`);
                    break
                }
                //добавляем спутник
                case "moon" : {
                    let parentPlanet = body.parentPlanet
                    let moon = new Moon(body)
                    moon.parentPlanet = parentPlanet
                    await moon.save()
                    //вешаем спутник на орбиту материнской планеты
                    let planet = await Planet.findOne({title: parentPlanet})
                    if(planet){
                        planet.moons.push(moon._id)
                        await Planet.update({title: parentPlanet}, {$set: planet})
                    }
                    res.redirect(`/moons/${body.title}`);
                    break
                }
                default : res.redirect(`/`);
            }
        }
    }catch(err){
        console.log(err)
        res.render('add', { title: err, isAdmin: req.isAuthenticated() });
    }
}