const mongoose        = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const rentalSchema = mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    renter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence au locataire
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, required: true, enum: ['pending', 'approved', 'declined', 'completed'] },
});

rentalSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', rentalSchema);