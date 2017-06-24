/**
 * Created by janschmutz on 04.04.17.
 */
var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attending_count: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});


var Events = module.exports = mongoose.model('event', eventSchema, 'event');

module.exports.getEvents = function(callback, limit) {
    Events.find(callback).limit(limit);
};
module.exports.getEventbyId = function(id, callback) {
    Events.findById(id, callback);
};
module.exports.addEvent = function(event, callback) {
    Events.create(event, callback);
};
module.exports.updateEvent = function (id, event, options, callback) {
    var query = {_id : id};
    var update = {
        name: event.name,
        description: event.description,
        attending_count: event.attending_count,
        latitude: event.latitude,
        longitude: event.longitude,
        city: event.city
    };

    Events.findOneAndUpdate(query, update, options, callback);
};
