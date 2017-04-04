/**
 * Created by janschmutz on 04.04.17.
 */
var mongoose = require('mongoose');

var testSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Test = module.exports = mongoose.model('test', testSchema, 'test');

module.exports.getTests = function(callback, limit) {
    Test.find(callback).limit(limit);
};
module.exports.getTestbyId = function(id, callback) {
    Test.findById(id, callback);
};
