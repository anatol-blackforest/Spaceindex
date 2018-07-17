//Модель небесного тела
const { bodyTitle, bodyDescr, defaultWater, enumWater, defaultRadiation, enumRadiation } = require("../config/messages")

module.exports = {
    title: {
        type: String,
        required: bodyTitle,
        unique: true,
        lowercase:  true, 
        trim: true
    },
    image: {
        type: String,
        lowercase:  true, 
        trim: true
    },
    description: {
        type: String,
        required: bodyDescr
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
        default: defaultWater,
        enum: enumWater
    },
    radiation: {
        type: String,
        enum: enumRadiation,
        default: defaultRadiation
    },
    magnetosphere: {
        type: Boolean,
        default: false
    },
    atmosphere: {
        type: Boolean,
        default: false
    },
    atmosphericDensity: {
        type: Number,
        default: 1
    }
}
