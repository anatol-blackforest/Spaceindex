const mongoose = require('mongoose');
mongoose.Promise = Promise;

//Модель небесного тела
const AstroBodySchema = {
    diameter: {
        type: Number,
        default: 1000,
        require: true,
    },
    day:{
        type: Number,
        default: 24,
        require: true,
    },
    gravity: {
        type: Number,
        default: 1,
        require: true,
    },
    temperature: {
        type: Number,
        min: -273,
        default: 0,
        require: true,
    },
    water: {
        type: String,
        require: true,
        default: 'No water',
        enum: ['No water', 'Some water', 'Water world']
    },
    radiation: {
        type: String,
        enum: ['Low', 'Middle', 'High'],
        default: 'Middle',
        require: true,
    },
    magnetosphere: {
        type: Boolean,
        default: true,
        require: true,
    },
    atmosphera: {
        type: Boolean,
        required: true
    },
    atmospheraStructure: {
        type: Object
    }
}

// Модель планеты
const PlanetSchema = new mongoose.Schema({
    ...AstroBodySchema,
    year:{
        type: Number,
        default: 365,
        require: true,
    },
    distanseToStar:{
        type: Number,
        default: 150,
        require: true,
    }
}, {
    timestamps: true // createdAt, updatedAt
});

// Модель спутника
const MoonSchema = new mongoose.Schema({
    ...AstroBodySchema,
    distanseToParentPlanet:{
        type: Number,
        default: 300,
        require: true,
    }
}, {
    timestamps: true // createdAt, updatedAt
});

const Planet = mongoose.model('Planet', PlanetSchema);
const Moon = mongoose.model('Moon', MoonSchema);

module.exports = {
    Planet,
    Moon
};
