// сводим модули
const connection = require("./connection.js")
const deleteArticle = require("./delete.js")
const current = require("./current.js")
const schema = require("./schema.js")
const list = require("./list.js")
const add = require("./add.js")

module.exports = {
    connection,
    schema,
    current,
    deleteArticle,
    add,
    list
}
