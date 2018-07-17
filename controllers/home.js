const {Planet, Moon} = require('../models');
let {postsPerMainPage} = require('../config');
let {sitename} = require('../config/messages');

module.exports = async (req, res) => {
    try{
        let planets, moons
        planets = await Planet.find().limit(postsPerMainPage).sort({createdAt: -1})
        moons = await Moon.find().limit(postsPerMainPage).sort({createdAt: -1})
        res.render('home', { title: sitename, planets, moons, isAdmin: req.isAuthenticated()})
    }catch(err){
        console.log(err)
        res.render('error', {isAdmin: req.isAuthenticated()});
    }
}
