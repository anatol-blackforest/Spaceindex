//сносим планету или спутник
const fs = require('fs');
const {promisify} = require('util');
const path = require('path');
const stat = promisify(fs.stat);

const {regexp} = require('../config');
const {Planet, Moon} = require('./schema.js');

//сносим изображение на диске по ссылке в БД
const removeImg = async result => {
    if(result && result.image){
        await stat(path.join('public', 'uploades', result.image))
        await fs.unlink(path.join('public', 'uploades', result.image))
    }
}

module.exports = async ({params: {title}}, res, category) => {
    try{
        switch(category){
            case "planets" : {
                //сносим планету
                let result = await Planet.findOneAndRemove({title});
                removeImg(result)
                res.redirect(`/planets/`);
                break
            }
            case "moons" : {
                //сносим луну
                let result = await Moon.findOneAndRemove({title});
                removeImg(result)
                //по названию материнской планеты возвращаем обновленный список ее спутников
                let parentPlanet = await Planet.findOne({title: result.parentPlanet}).populate("moons")
                if(parentPlanet){
                    const moons = parentPlanet.moons.filter(moon => moon.title !== title)
                    await Planet.update({title: parentPlanet.title}, {$set: {moons}})
                }
                res.redirect(`/moons/`);
                break
            }
            default : res.redirect(`/`);
        }
    }catch(err){
        console.log(err)
        res.redirect('/');
    }
}
