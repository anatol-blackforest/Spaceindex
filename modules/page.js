//считываем планеты или луны с базы
const {Planet, Moon} = require('./schema.js');
let {planetPagination, moonPagination, postsPerPage} = require('../config');

const countFunc = async (Schema, req, res, pagination, category) => {
    let objects, moons, count, num = req.params.num
    objects = await Schema.find()
    count = objects.length
    pagination.pages = Math.ceil(count / postsPerPage)
    pagination.openPager = (count > postsPerPage)
    pagination.activePage = parseInt(num)
    let {openPager, pages, activePage} = pagination
    objects = await Schema.find().skip((num-1)*postsPerPage).limit(postsPerPage).sort({createdAt: -1})
    res.render('index', { objects, moons, category, openPager, pages, activePage, isAdmin: req.isAuthenticated() });
}

module.exports = async (req, res, category) => {
    try{
        let objects, moons, count
        switch(category){
            case "planets" : {
                countFunc(Planet, req, res, planetPagination, category)
                break
            }
            case "moons" : {
                countFunc(Moon, req, res, moonPagination, category)
                break
            }
            default : res.redirect("/")
        }
    }catch(err){
        console.log(err)
        res.render('error', {isAdmin: req.isAuthenticated() });
    }
}
