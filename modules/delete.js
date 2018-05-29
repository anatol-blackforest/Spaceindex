//сносим планету или спутник
const fs = require('fs');
const {promisify} = require('util');
const path = require('path');
const stat = promisify(fs.stat);

const {regexp} = require('../config');
let {Planet, Moon} = require('./schema.js');

//сносим изображение на диске по ссылке в БД
const removeImg = async image => {
    if(image){
        await stat(path.join('public', 'uploades', image))
        await fs.unlink(path.join('public', 'uploades', image))
    }
}

module.exports = async ({params: {title}}, res, category) => {
    try{
        switch(category){
            case "planets" : {
                //сносим планету
                let {image} = await Planet.findOneAndRemove({title});
                removeImg(image)
                res.redirect(`/planets/`);
                break
            }
            case "moons" : {
                //сносим луну
                let {parentPlanet, image} = await Moon.findOneAndRemove({title});
                removeImg(image)
                //по названию материнской планеты возвращаем обновленный список ее спутников
                parentPlanet = await Planet.findOne({title: parentPlanet}).populate("moons")
                const moons = parentPlanet.moons.filter(moon => moon.title !== title)
                await Planet.update({title: parentPlanet.title}, {$set: {moons}})
                res.redirect(`/moons/`);
                break
            }
        }
    }catch(err){
        console.log(err)
        res.redirect('/');
    }
}
