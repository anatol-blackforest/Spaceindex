//изменяем небесное тело
const fs = require('fs');
const {promisify} = require('util');
const path = require('path');
const stat = promisify(fs.stat);

const {regexp} = require('../config');
let {Planet, Moon} = require('./schema.js');

//сносим изображение на диске по ссылке в БД
const removeImg = async (result, image) => {
    if(result && result.image && image){
        await stat(path.join('public', 'uploades', result.image))
        await fs.unlink(path.join('public', 'uploades', result.image))
    }
}

module.exports = async ({file, body}, res) => {   
    try{
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
                    let parentPlanet = body.parentPlanet
                    //вешаем спутник на орбиту новой материнской планеты
                    let planet = await Planet.findOne({title: parentPlanet})
                    if(planet){
                        planet.moons.splice(planet.moons.indexOf(moon._id), 1)  
                        await Planet.update({title: body.oldParentPlanet}, {$set: {moons: planet.moons}})
                        planet.moons.push(moon._id)
                        await Planet.update({title: parentPlanet}, {moons: planet.moons})
                    }
                    res.redirect(`/moons/${body.title}`);
                    break
                }
                default : res.redirect(`/`);
            }
        }    
    }catch(err){
        console.log(err)
        res.render('index', { title: err });
    }
}
