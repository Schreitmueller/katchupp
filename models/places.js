/**
 * Created by janschmutz on 23.06.17.
 */

var mongoose = require('mongoose');

var placeSchema = mongoose.Schema({
    name: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

var Places = module.exports = mongoose.model('place', placeSchema, 'place');

