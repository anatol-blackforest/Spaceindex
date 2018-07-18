//модель приложения
const mongoose = require('mongoose');
const AstroBodySchema = require('./prototype');
mongoose.Promise = Promise;

// Схема планеты
const PlanetSchema = new mongoose.Schema({
    ...AstroBodySchema,
    year:{
        type: Number,
        default: 365
    },
    distanseFromStar:{
        type: Number,
        default: 150
    },
    moons: [{
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'Moon'
    }]
}, {
    timestamps: true // createdAt, updatedAt
});

module.exports = mongoose.model('Planet', PlanetSchema);
