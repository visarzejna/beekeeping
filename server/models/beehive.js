const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beehiveSchema = new Schema({
    name: {type: String, required: true},
    info: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    user: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

beehiveSchema.post('remove', removeInspections);

async function removeInspections(beehive, next) {
    try {
        await Inspection.find({beehive: { $in: beehive._id}}, function (errors, inspections){
            if(errors){
                return next(errors);
            }
            return Promise.all(inspections.map(i => i.remove()))
        }).clone();
        next();
    } catch(e) {
        next(e);
    }
}

module.exports = mongoose.model('Beehive', beehiveSchema);