//изменяем небесное тело
const fs = require('fs');
const {promisify} = require('util');
const path = require('path');
const stat = promisify(fs.stat);

const {regexp} = require('../config');
const {Planet, Moon} = require('./schema.js');

//сносим изображение на диске по ссылке в БД
const removeImg = async (result, image) => {
    if(result && result.image && image){
        await stat(path.join('public', 'uploades', result.image))
        await fs.unlink(path.join('public', 'uploades', result.image))
        await stat(path.join('public', 'uploades','thumbs', result.image))
        await fs.unlink(path.join('public', 'uploades', 'thumbs', result.image))
    }
}

module.exports = async (req, res) => {   
    try{
        let {file, body} = req
        if (file && file.filename) body.image = file.filename
        if (body && body.title && body.description){
            switch(body.type){
                //изменяем планету
                case "planets" : {
                    let planet = await Planet.findOneAndUpdate({title: body.oldTitle}, {$set: body})
                    removeImg(planet, body.image)
                    res.redirect(`/planets/${body.title}`);
                    break
                }
                //изменяем спутник
                case "moons" : {
                    let moon = await Moon.findOneAndUpdate({title: body.oldTitle}, {$set: body})
                    removeImg(moon, body.image)
                    let {parentPlanet, oldParentPlanet} = body
                    //вешаем спутник на орбиту новой материнской планеты
                    let oldPlanet = await Planet.findOne({title: oldParentPlanet}).populate("moons")
                    let newPlanet = await Planet.findOne({title: parentPlanet})
                    if(newPlanet){
                        oldPlanet.moons = oldPlanet.moons.filter(item => item.title !== body.title)
                        await Planet.update({title: oldParentPlanet}, {$set: {moons: oldPlanet.moons}})
                        if (parentPlanet !== oldParentPlanet) newPlanet.moons.push(moon._id)
                        await Planet.update({title: parentPlanet}, {$set: {moons: newPlanet.moons}})
                    }
                    res.redirect(`/moons/${body.title}`);
                    break
                }
                default : res.redirect(`/`);
            }
        }    
    }catch(err){
        console.log(err)
        res.render('index', { title: err, isAdmin: req.isAuthenticated()});
    }
}
