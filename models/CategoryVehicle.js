// Importation de dépendances nécessaires
const mongoose        = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 * Définition du schéma de la collection CategoryVehicle.
 * Utilise mongoose.Schema pour créer un modèle de données pour les catégories de véhicules.
 * Chaque catégorie de véhicule doit avoir un libellé unique et requis.
 */
const categoryVehicleSchema = mongoose.Schema({
    libelle: { type: String, required: true, unique: true }
});

// Application du plugin uniqueValidator au schéma pour assurer l'unicité des libellés des catégories.
categoryVehicleSchema.plugin(uniqueValidator);

// Exportation du modèle pour permettre son utilisation dans d'autres parties de l'application.
// 'CategoryVehicle' sera le nom de la collection dans la base de données MongoDB.
module.exports = mongoose.model('CategoryVehicle', categoryVehicleSchema);