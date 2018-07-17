// сводим роуты
const about = require("./about")
const add = require("./add")
const edit = require("./edit")
const failureAuth = require("./failure")
const home = require("./home")
const install = require("./install")
const login = require("./login")
const logout = require("./logout")
const moons = require("./moons")
const planets = require("./planets")
const search = require("./search")

module.exports = {
    about,
    add,
    edit,
    failureAuth,
    home,
    install,
    login,
    logout,
    moons,
    planets,
    search
}
