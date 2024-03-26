/**
 * Contrôleur pour la gestion des commentaires sur les véhicules.
 * Ce fichier implémente les opérations CRUD pour les commentaires liés aux véhicules dans l'application.
 * Il permet de récupérer tous les commentaires associés à un véhicule spécifique et d'ajouter un nouveau commentaire à un véhicule.
 * Les commentaires sont liés aux véhicules par leur ID et incluent des informations sur l'auteur du commentaire.
 * 
 * Les erreurs potentielles sont gérées et communiquées au client de manière appropriée.
 */

// Importation du modèle représentant la structure des données en BDD pour la table comment
const Comment = require('../models/Comment');

/**
 * Récupère tous les commentaires associés à un véhicule spécifique.
 * Utilise l'ID de véhicule fourni dans les paramètres de la requête pour trouver les commentaires correspondants.
 * Les documents de commentaires sont enrichis par les informations sur le véhicule et l'auteur grâce à la méthode `populate`.
 * 
 * @param {Object} req - L'objet de la requête Express, contenant `params.vehicleId` pour identifier le véhicule concerné.
 * @param {Object} res - L'objet de la réponse Express. Renvoie les commentaires trouvés ou un message d'erreur.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
exports.findCommentsByVehicle = (req, res, next) => {
    const veiculeId = req.params.vehicleId;

    Comment.find({ vehicle: veiculeId })
        .populate('vehicle', 'libelle')
        .populate('author', 'pseudo')
        .then(comments => {
        if (!comments) {
            return res.status(404).json({ message: 'No Comment for this vehicle.' });
        }
        res.status(200).json(comments);
        })
        .catch(error => {
        res.status(500).json({ error });
        });
};

/**
 * Crée et sauvegarde un nouveau commentaire pour un véhicule.
 * Les informations du commentaire sont prises du corps de la requête. L'ID de l'auteur est ajouté automatiquement
 * basé sur l'authentification de l'utilisateur (nécessite que l'utilisateur soit authentifié).
 * 
 * @param {Object} req - L'objet de la requête Express. `body` contient les données du nouveau commentaire,
 *                       et `auth.userId` identifie l'auteur du commentaire.
 * @param {Object} res - L'objet de la réponse Express. Renvoie un message de succès ou d'erreur.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
exports.addComment = (req, res, next) => {
    const commentObject = req.body;
    delete commentObject._id;
    const comment = new Comment({...commentObject, author: req.auth.userId});
  
    comment.save()
    .then(() => { res.status(201).json({message: 'Comment saved !'})})
    .catch(error => { res.status(400).json( { error })})
 };
