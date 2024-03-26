// Importation des dépendances nécessaires pour le schéma
const mongoose        = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 * Schéma Mongoose pour les commentaires.
 * Définit la structure des documents de commentaire dans la base de données MongoDB.
 * 
 * Chaque commentaire est lié à un véhicule et un auteur (utilisateur), contient du texte et une date de création.
 * L'utilisation du plugin `uniqueValidator` assure que certains champs (si spécifiés) soient uniques dans la collection.
 */
const commentSchema = mongoose.Schema({
    // Référence au modèle de véhicule, champ obligatoire
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    // Référence au modèle d'utilisateur qui a écrit le commentaire, champ obligatoire
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    // Date de création du commentaire, avec une valeur par défaut à la date courante
    date: { type: Date, default: Date.now },
});

// Application du plugin `uniqueValidator` au schéma pour validation d'unicité
commentSchema.plugin(uniqueValidator);

// Exportation du modèle 'Comment', basé sur `commentSchema`, pour utilisation dans l'application.
// 'Comment' sera le nom de la collection dans la base de données MongoDB.
module.exports = mongoose.model('Comment', commentSchema);