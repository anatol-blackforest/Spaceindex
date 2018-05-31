exports.mongoUrl = process.env.MONGOURI || "mongodb://localhost:27017/spacebase"
//валидатор id
exports.regexp = /[^a-f0-9]/
//планет тел на странице
exports.postsPerPage = 4
//конфигурация постраничной навигации
exports.planetPagination = {openPager: false, pages: 0, activePage: 1}
exports.moonPagination = {openPager: false, pages: 0, activePage: 1}
