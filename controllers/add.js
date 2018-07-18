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
                    //название в нижний регистр
                    body.title = body.title.toLowerCase()
                    const {title} = body
                    const planet = new Planet(body);
                    //подвешиваем готовые спутники
                    planet.moons = await Moon.find({parentPlanet: title})
                    await planet.save();
                    res.redirect(`/planets/${title}`);
                    break
                }
                //добавляем спутник
                case "moon" : {
                    //название в нижний регистр
                    body.parentPlanet = body.parentPlanet.toLowerCase()
                    const {parentPlanet} = body
                    const moon = new Moon(body)
                    await moon.save()
                    //вешаем спутник на орбиту материнской планеты
                    const planet = await Planet.findOne({title: parentPlanet})
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
