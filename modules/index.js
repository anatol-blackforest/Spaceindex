// сводим модули
const connection = require("./connection.js")
const uploader = require("./uploader.js")
const postuploader = require("./postuploader.js")
const formhandler = require("./formhandler.js")
const deleteArticle = require("./delete.js")
const change = require("./change.js")
const page = require("./page.js")
const messages = require("./messages.js")
const current = require("./current.js")
const schema = require("./schema.js")
const list = require("./list.js")
const add = require("./add.js")

module.exports = {
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
