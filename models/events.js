/**
 * Created by janschmutz on 04.04.17.
 */
var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Event = module.exports = mongoose.model('event', eventSchema, 'event');

module.exports.getEvents = function(callback, limit) {
    Event.find(callback).limit(limit);
};
module.exports.getEventbyId = function(id, callback) {
    Event.findById(id, callback);
};
module.exports.addEvent = function(event, callback) {
    Event.create(event, callback);
};
