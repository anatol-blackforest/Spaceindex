exports.mongoUrl = process.env.MONGOURI || "mongodb://localhost:27017/spacebase"
// "mongodb+srv://blackforest:2012@spacecluster-bgdge.mongodb.net/test?retryWrites=true/spacebase"
//валидатор id
exports.regexp = /[^a-f0-9]/
