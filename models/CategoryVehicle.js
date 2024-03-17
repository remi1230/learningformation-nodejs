const mongoose        = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categoryVehicleSchema = mongoose.Schema({
    libelle: { type: String, required: true, unique: true }
});

categoryVehicleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('CategoryVehicle', categoryVehicleSchema);