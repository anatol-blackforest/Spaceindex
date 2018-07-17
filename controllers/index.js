// сводим контроллеры
const crypto = require("./crypto")
const uploader = require("./uploader")
const postuploader = require("./postuploader")
const formhandler = require("./formhandler")
const deleteArticle = require("./delete")
const current = require("./current")
const search = require("./search")
const change = require("./change")
const page = require("./page")
const home = require("./home")
const list = require("./list")
const add = require("./add")
const install = require("./install")
const getAccount = require("./getaccount")

module.exports = {
    getAccount,
    crypto,
    home,
    install,
    search,
    uploader,
    postuploader,
    formhandler,
    current,
    deleteArticle,
    add,
    list,
    page,
    change
}
