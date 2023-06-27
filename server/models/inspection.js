const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inspectionSchema = new Schema({
        name: String,
        createdAt: {type: Date, default: Date.now},
        description: {type: String},
        beehive: {type: Schema.Types.ObjectId, ref: 'Beehive'}
})

module.exports = mongoose.model('Inspection', inspectionSchema);