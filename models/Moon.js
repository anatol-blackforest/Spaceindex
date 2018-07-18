//модель приложения
const mongoose = require('mongoose');
const AstroBodySchema = require('./prototype');
mongoose.Promise = Promise;

// Схема спутника
const MoonSchema = new mongoose.Schema({
    ...AstroBodySchema,
    distanseFromParentPlanet:{
        type: Number,
        default: 300
    },
    parentPlanet: {
        type: String,
        lowercase:  true, 
        required: "Moon must have a parent planet!",
    }
    
}, {
    timestamps: true // createdAt, updatedAt
});

module.exports = mongoose.model('Moon', MoonSchema);
