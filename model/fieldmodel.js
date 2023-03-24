const mongoose = require('mongoose');
const fieldschema = mongoose.Schema({
    tripName: {
        type: String,
        required: [true, "A trip must have a name"],
        unique: true,
        maxlength: [40, "A trip name must have less or equal to 40 characters"],
        minlength: [10, "A trip name must have more or equal to 10 characters"]
    },
    description: {
        type: String,
        required: [true, "A trip must have a name"]
    },
    rating: {
        type: Number,
        default: 0
    }
});
const Field = mongoose.model('Field', fieldschema);
module.exports = Field;