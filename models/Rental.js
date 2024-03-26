// Importation des modules nécessaires
const mongoose        = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 * Schéma pour les locations (`Rental`) dans la base de données MongoDB.
 * Ce modèle détaille la structure des données pour chaque location de véhicule, y compris le véhicule loué,
 * le locataire, les dates de début et de fin de location, et le statut de la location.
 * 
 * Le schéma utilise le plugin `uniqueValidator` pour assurer l'unicité de certaines valeurs si nécessaire.
 */
const rentalSchema = mongoose.Schema({
    // Référence au véhicule loué, champ obligatoire
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    // Référence à l'utilisateur qui loue le véhicule, champ obligatoire
    renter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    // Statut de la location, limité à certains valeurs, champ obligatoire
    status: { type: String, required: true, enum: ['pending', 'approved', 'declined', 'completed'] },
});

// Application du plugin `uniqueValidator` pour la validation d'unicité sur le schéma
rentalSchema.plugin(uniqueValidator);

// Exportation du modèle `Rental` pour son utilisation dans d'autres parties de l'application
module.exports = mongoose.model('Rental', rentalSchema);