const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    event: { type: Types.ObjectId, ref: 'Event' },
    uniqueCode: [{ type: String, required: true }],
})

module.exports = model('Tickets', schema)
