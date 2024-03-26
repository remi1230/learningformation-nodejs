/**
 * Contrôleur de gestion des locations pour l'application.
 * Ce fichier contient l'ensemble des méthodes nécessaires pour la manipulation et la consultation des informations de locations dans la base de données.
 * Il permet la récupération des données de toutes les locations, des détails d'une location spécifique, ainsi que la création et la mise à jour de locations.
 * Les méthodes utilisent le modèle Rental pour interagir avec la base de données et renvoyer les résultats.
 * 
 * Chaque fonction reçoit les objets de requête et de réponse d'Express ainsi qu'une fonction de rappel `next` pour la gestion des erreurs ou le passage à un autre middleware.
 */

// Importation du modèle représentant la structure des données en BDD pour la table rental
const Rental = require('../models/Rental');

/**
 * Récupère toutes les locations enregistrées dans la base de données.
 * Enrichit les données de chaque location avec des informations sur le véhicule loué et le locataire grâce à `populate`.
 * 
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express. Renvoie une liste de toutes les locations.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
exports.findAllRental = (req, res, next) => {
  Rental.find()
  .populate('vehicle', 'libelle')
  .populate('renter', 'pseudo')
  .then(
  (rentals) => {
      res.status(200).json(rentals);
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
 * Récupère les détails d'une location spécifique par son ID.
 * Enrichit les données de la location avec des informations sur le véhicule loué et le locataire.
 * 
 * @param {Object} req - L'objet de la requête Express, contenant `params.id` pour identifier la location concernée.
 * @param {Object} res - L'objet de la réponse Express. Renvoie les détails de la location ou un message d'erreur.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
exports.getRentalDetails = (req, res, next) => {
  const rentalId = req.params.id;
  
  Rental.findById(rentalId)
    .populate('vehicle', 'libelle')
    .populate('renter', 'pseudo')
    .then(rental => {
      if (!rental) {
        return res.status(404).json({ message: 'Vehicle not found.' });
      }
      res.status(200).json(rental);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};

/**
 * Récupère toutes les locations effectuées par un locataire spécifique.
 * Utilise l'ID du locataire fourni dans les paramètres de la requête pour filtrer les locations.
 * Les données des locations sont enrichies avec des informations sur le véhicule et le locataire.
 * 
 * @param {Object} req - L'objet de la requête Express, contenant `params.renterId` pour identifier le locataire.
 * @param {Object} res - L'objet de la réponse Express. Renvoie une liste de locations ou un message d'erreur.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
exports.findRentalsByRenter = (req, res, next) => {
    const renterId = req.params.renterId;

    Rental.find({ renter: renterId })
        .populate('vehicle', 'libelle')
        .populate('renter', 'pseudo')
        .then(rentals => {
        if (!rentals) {
            return res.status(404).json({ message: 'No rental for this renter.' });
        }
        res.status(200).json(rentals);
        })
        .catch(error => {
        res.status(500).json({ error });
        });
};

/**
 * Récupère toutes les locations associées à un véhicule spécifique.
 * Utilise l'ID du véhicule fourni dans les paramètres de la requête pour filtrer les locations.
 * Les données des locations sont enrichies avec des informations sur le véhicule et le locataire.
 * 
 * @param {Object} req - L'objet de la requête Express, contenant `params.vehicleId` pour identifier le véhicule.
 * @param {Object} res - L'objet de la réponse Express. Renvoie une liste de locations ou un message d'erreur.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
 exports.findRentalsByVehicle = (req, res, next) => {
    const vehicleId = req.params.vehicleId;

    Rental.find({ vehicle: vehicleId })
        .populate('vehicle', 'libelle')
        .populate('renter', 'pseudo')
        .then(rentals => {
        if (!rentals) {
            return res.status(404).json({ message: 'No rental for this vehicle.' });
        }
        res.status(200).json(rentals);
        })
        .catch(error => {
        res.status(500).json({ error });
        });
};

/**
 * Crée et sauvegarde une nouvelle location avec les informations fournies dans le corps de la requête.
 * L'ID du locataire est automatiquement ajouté basé sur l'authentification de l'utilisateur.
 * 
 * @param {Object} req - L'objet de la requête Express. `body` contient les données de la nouvelle location,
 *                       et `auth.userId` identifie le locataire.
 * @param {Object} res - L'objet de la réponse Express. Renvoie un message de succès ou d'erreur.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
exports.addRental = (req, res, next) => {
    const rentalObject = req.body;
    delete rentalObject._id;
    const rental = new Rental({...rentalObject, renter: req.auth.userId});
  
    rental.save()
    .then(() => { res.status(201).json({message: 'Rental saved !'})})
    .catch(error => { res.status(400).json( { error })})
 };

 /**
 * Met à jour le statut d'une location spécifique par son ID avec le nouveau statut fourni dans le corps de la requête.
 * 
 * @param {Object} req - L'objet de la requête Express, contenant `params.id` pour l'identification de la location
 *                       et `body.status` pour le nouveau statut de la location.
 * @param {Object} res - L'objet de la réponse Express. Renvoie les données de la location mise à jour ou un message d'erreur.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
 exports.updateRentalStatus = (req, res, next) => {
    const rentalId  = req.params.id;
    const newStatus = req.body.status;
    
    Rental.findByIdAndUpdate(rentalId, { $set: { status: newStatus } }, { new: true })
      .then(rental => {
        if (!rental) {
          return res.status(404).json({ message: 'Rental not found.' });
        }
        res.status(200).json(rental);
      })
      .catch(error => {
        res.status(500).json({ error: error });
      });
};