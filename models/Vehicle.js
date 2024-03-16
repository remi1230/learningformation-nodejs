const mongoose        = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const vehicleSchema = mongoose.Schema({
    libelle: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryVehicle', required: true },
    priceDay: { type: Number, required: true },
    prestataire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

vehicleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', vehicleSchema);