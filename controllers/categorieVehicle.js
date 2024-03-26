/**
 * Contrôleur pour les catégories de véhicules.
 * Ce fichier définit les actions qui peuvent être effectuées sur les catégories de véhicules,
 * notamment la récupération de toutes les catégories existantes dans la base de données
 * et la création de nouvelles catégories de véhicules. Ces actions supportent les opérations CRUD
 * de base nécessaires à la gestion des catégories de véhicules dans l'application.
 * 
 * Les fonctions définies ici sont utilisées par les routes de l'application Express pour interagir
 * avec le modèle de données de catégorie de véhicules, permettant ainsi aux utilisateurs finaux
 * d'accéder à ces données ou de les modifier via des requêtes HTTP.
 */

//Importation du modèle représentant la structure des données en BDD pour la table categoryVehicle
const CategorieVehicle = require('../models/CategoryVehicle');

/**
 * Récupère toutes les catégories de véhicules disponibles dans la base de données.
 * Définit les en-têtes de cache pour améliorer les performances des requêtes répétées en permettant le cache côté client.
 * 
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express. Renvoie une liste de toutes les catégories de véhicules.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
exports.findAllCategorieVehicle = (req, res, next) => {
    CategorieVehicle.find().then(
    (categorieVehicles) => {
        res.set({'Cache-Control': 'public, max-age=60000'});
        res.status(200).json(categorieVehicles);
    }
    ).catch(
    (error) => {
        res.status(400).json({
        error: error
        });
      }
    );
 };

/**
 * Crée une nouvelle catégorie de véhicule avec le libellé fourni dans le corps de la requête.
 * Sauvegarde la nouvelle catégorie dans la base de données.
 * 
 * @param {Object} req - L'objet de la requête Express. `body` doit contenir `libelle`, le nom de la nouvelle catégorie.
 * @param {Object} res - L'objet de la réponse Express. Renvoie un message de succès en cas de création réussie.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
exports.createCategorieVehicle = (req, res, next) => {
    const libelle = req.body.libelle;
    const categorieVehicle = new CategorieVehicle({libelle: libelle});
  
    categorieVehicle.save()
    .then(() => { res.status(201).json({message: 'Catégorie de véhicule enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };