const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    creator: { type: Types.ObjectId, ref: 'User' },
    link: { type: String, required: true },
    tickets: { type: Types.ObjectId, ref: 'Ticket' },

    description: {
        eventName: { type: String, required: true, unique: true },
        date: { type: String, required: true },
        time: { type: String, required: true },
        location: { type: String, required: true },
        about: { type: String, required: true },
        img: {
            data: Buffer,
            contentType: String,
        },
        price: { type: Number, require: true },
    },

    hasHall: { type: Boolean, required: true },
    seats: { type: Number, required: true },
    width: { type: Number },
})

module.exports = model('Event', schema)
