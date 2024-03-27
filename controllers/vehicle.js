/**
 * Contrôleur pour la gestion des véhicules.
 * Ce fichier contient les définitions des méthodes permettant d'interagir avec les données des véhicules stockées dans la base de données.
 * Il offre des fonctionnalités pour récupérer tous les véhicules disponibles, rechercher des véhicules par catégorie,
 * obtenir les détails d'un véhicule spécifique, ajouter un nouveau véhicule, mettre à jour les informations d'un véhicule existant,
 * et supprimer un véhicule.
 *
 * Chaque méthode gère une opération spécifique liée aux véhicules, en s'appuyant sur le modèle Vehicle pour interagir avec la base de données.
 * Les réponses sont formatées et renvoyées en JSON, et les erreurs potentielles sont gérées et retournées au client de manière appropriée.
 * Les opérations d'ajout, de mise à jour et de suppression nécessitent que l'utilisateur soit authentifié en tant que 'prestataire',
 * afin d'assurer que seuls les utilisateurs autorisés puissent modifier les données.
 *
 * Les routes associées à ces méthodes sont définies dans un fichier de routage séparé, qui mappe les requêtes HTTP aux méthodes correspondantes
 * définies dans ce contrôleur.
 */

// Importation du modèle représentant la structure des données en BDD pour la table vehicle
const Vehicle = require('../models/Vehicle');

/**
 * Récupère tous les véhicules disponibles.
 * 
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
exports.findAllVehicle = (req, res, next) => {
    Vehicle.find().then(
    (vehicles) => {
        res.status(200).json(vehicles);
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
 * Recherche des véhicules par catégorie.
 * Utilise l'ID de catégorie fourni dans les paramètres de la requête pour trouver les véhicules correspondants.
 * 
 * @param {Object} req - L'objet de la requête Express, contient `params.categoryVehicleId` pour la recherche.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
 exports.findVehiclesByCategory = (req, res, next) => {
    const categoryVehicleId = req.params.categoryVehicleId;

    Vehicle.find({ category: categoryVehicleId })
        .populate('category', 'libelle')
        .then(vehicles => {
        if (!vehicles) {
            return res.status(404).json({ message: 'Aucun véhicule dans cette catégorie.' });
        }
        res.status(200).json(vehicles);
        })
        .catch(error => {
        res.status(500).json({ error });
        });
};

/**
 * Récupère les détails d'un véhicule spécifique.
 * Utilise l'ID de véhicule fourni dans les paramètres de la requête pour trouver et retourner les détails du véhicule.
 * 
 * @param {Object} req - L'objet de la requête Express, contient `params.id` pour identifier le véhicule.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
exports.getVehicleDetails = (req, res, next) => {
    const vehicleId = req.params.id;
    
    Vehicle.findById(vehicleId)
      .then(vehicle => {
        if (!vehicle) {
          return res.status(404).json({ message: 'Vehicle not found.' });
        }
        res.status(200).json(vehicle);
      })
      .catch(error => {
        res.status(500).json({ error: error });
      });
};

/**
 * Ajoute un nouveau véhicule à la base de données.
 * Exige que l'utilisateur soit un prestataire. Les données du véhicule sont prises du corps de la requête.
 * 
 * @param {Object} req - L'objet de la requête Express, `body` contient les données du véhicule, `auth.userId` identifie l'utilisateur.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
exports.addVehicle = (req, res, next) => {
    const vehicleObject = req.body;
    delete vehicleObject._id;
    const vehicle = new Vehicle({...vehicleObject, prestataire: req.auth.userId});

    if(req.auth.userRole !== 'prestataire'){ return res.status(400).json( { error: "You must be prestataire to add vehicle!" })};
  
    vehicle.save()
    .then(() => { res.status(201).json({message: 'Véhicule saved !'})})
    .catch(error => { res.status(400).json( { error, reqBody: req.body })})
 };

 /**
 * Met à jour les données d'un véhicule existant.
 * Seul le prestataire qui a ajouté le véhicule peut le mettre à jour. Supporte la mise à jour de l'image du véhicule.
 * 
 * @param {Object} req - L'objet de la requête Express. Contient `params.id` pour l'identification du véhicule et `body` ou `file` pour les nouvelles données.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
 exports.updateVehicle = (req, res, next) => {
    const vehicleObject = req.file ? {
        ...JSON.parse(req.body.vehicle),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete vehicleObject._prestataire;
    Vehicle.findOne({_id: req.params.id})
        .then((vehicle) => {
            if (vehicle.prestataire != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized', vehiclePrestataire: vehicle.prestataire, userConnectedId: req.auth.userId});
            } else {
                Vehicle.updateOne({ _id: req.params.id}, { ...vehicleObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Véhicule updated!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

/**
 * Supprime un véhicule de la base de données.
 * Seul le prestataire qui a ajouté le véhicule peut le supprimer.
 * 
 * @param {Object} req - L'objet de la requête Express, `params.id` pour identifier le véhicule à supprimer.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
exports.deleteVehicle = (req, res, next) => {
    Vehicle.findOne({ _id: req.params.id})
        .then(vehicle => {
            if (vehicle.prestataire != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                Vehicle.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Vehicle deleted !'})})
                        .catch(error => res.status(401).json({ error }));
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};