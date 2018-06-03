// сводим модули
const connection = require("./connection")
const crypto = require("./crypto")
const uploader = require("./uploader")
const postuploader = require("./postuploader")
const formhandler = require("./formhandler")
const deleteArticle = require("./delete")
const messages = require("./messages")
const current = require("./current")
const schema = require("./schema")
const search = require("./search")
const change = require("./change")
const page = require("./page")
const list = require("./list")
const add = require("./add")
const install = require("./install")


module.exports = {
    crypto,
    install,
    search,
    uploader,
    postuploader,
    formhandler,
    messages,
    connection,
    schema,
    current,
    deleteArticle,
    add,
    list,
    page,
    change
}
