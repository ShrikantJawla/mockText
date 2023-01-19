const { Schema, model } = require('mongoose')


const bugCard = new Schema({
    status: { type: String, enum: ['citical', 'major', 'medium', 'low'], required: true },
    text: { type: String, default: 'This is a Bug' }
})


module.exports = model('bugCard', bugCard)