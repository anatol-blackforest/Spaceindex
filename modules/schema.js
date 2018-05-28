const mongoose = require('mongoose');
mongoose.Promise = Promise;

//Модель небесного тела
const AstroBodySchema = {
    title: {
        type: String,
        required: "Planet or moon must have a title!",
        unique: true,
        lowercase:  true, 
        trim: true
    },
    description: {
        type: String,
        required: "Please, describe this planet or planetoid!"
    },
    diameter: {
        type: Number,
        default: 1000
    },
    day:{
        type: Number,
        default: 24
    },
    gravity: {
        type: Number,
        default: 1
    },
    temperature: {
        type: Number,
        min: -273,
        default: 0
    },
    water: {
        type: String,
        default: 'No water',
        enum: ['No water', 'Some water', 'Water world']
    },
    radiation: {
        type: String,
        enum: ['Low', 'Middle', 'High'],
        default: 'Middle'
    },
    magnetosphere: {
        type: Boolean,
        default: false
    },
    atmosphere: {
        type: Boolean,
        default: false
    }
}

// Схема планеты
const PlanetSchema = mongoose.Schema({
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

// Схема спутника
const MoonSchema = mongoose.Schema({
    ...AstroBodySchema,
    distanseFromParentPlanet:{
        type: Number,
        default: 300
    },
    parentPlanet: String
    
}, {
    timestamps: true // createdAt, updatedAt
});

exports.Planet = mongoose.model('Planet', PlanetSchema);
exports.Moon = mongoose.model('Moon', MoonSchema);
