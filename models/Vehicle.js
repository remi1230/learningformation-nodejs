// Importation des dépendances nécessaires
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 * Schéma Mongoose pour les véhicules.
 * Ce schéma définit la structure des documents véhicule dans la base de données MongoDB, 
 * incluant le libellé, la description, l'image, la catégorie, le prix par jour, et le prestataire (propriétaire du véhicule).
 * 
 * Le champ `category` fait référence à un document dans la collection `CategoryVehicle`,
 * tandis que `prestataire` fait référence à un utilisateur dans la collection `User`.
 * Ces références permettent de lier des véhicules à des catégories spécifiques et à des prestataires.
 * 
 * Le plugin `uniqueValidator` est utilisé pour assurer l'unicité de certains champs, bien que dans ce schéma, aucun champ n'est explicitement marqué comme unique.
 * Il est ici pour une utilisation potentielle future ou pour être appliqué sur des sous-ensembles de données via des indices uniques dans MongoDB.
 */
const vehicleSchema = mongoose.Schema({
    libelle: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryVehicle', required: true },
    priceDay: { type: Number, required: true },
    prestataire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Application du plugin `uniqueValidator` pour validation d'unicité
vehicleSchema.plugin(uniqueValidator);

// Exportation du modèle `Vehicle` pour utilisation dans d'autres parties de l'application
module.exports = mongoose.model('Vehicle', vehicleSchema);