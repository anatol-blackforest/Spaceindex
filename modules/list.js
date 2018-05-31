//выводим список планет или спутников
const {Planet, Moon} = require('./schema.js');
let {planetPagination, moonPagination, postsPerPage} = require('../config');

const countFunc = async (Schema, res, pagination, category) => {
    let objects, moons, count
    objects = await Schema.find()
    count = objects.length
    pagination.pages = Math.ceil(count / postsPerPage)
    pagination.openPager = (count > postsPerPage)
    pagination.activePage = 1
    let {openPager, pages, activePage} =pagination
    objects = await Schema.find().limit(postsPerPage).sort({createdAt: -1})
    res.render('index', { objects, moons, category, openPager, pages, activePage });
}

module.exports = async (req, res, category) => {
    try{
        let objects, moons, count
        switch(category){
            case "planets" : {
                countFunc(Planet, res, planetPagination, category)
                break
            }
            case "moons" : {
                countFunc(Moon, res, moonPagination, category)
                break
            }
        }
    }catch(err){
        console.log(err)
        res.render('error');
    }
}
// .sort({ title: -1 }).limit(postsPerPage)