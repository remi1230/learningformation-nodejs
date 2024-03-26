// Importation des modules nécessaires
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 * Schéma pour les utilisateurs (`User`) dans la base de données MongoDB.
 * Définit la structure des documents pour les utilisateurs, incluant leur pseudo, email, mot de passe, et rôle.
 * Les champs `pseudo` et `email` sont marqués comme uniques, garantissant qu'aucun doublon ne peut exister dans la base de données.
 * 
 * Le plugin `uniqueValidator` est utilisé pour fournir une validation d'unicité plus informative et personnalisée.
 */
const userSchema = mongoose.Schema({
  pseudo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

// Application du plugin `uniqueValidator` pour améliorer les messages d'erreur relatifs à l'unicité.
userSchema.plugin(uniqueValidator);

// Exportation du modèle `User`, permettant son utilisation pour des opérations CRUD dans l'application.
module.exports = mongoose.model('User', userSchema);