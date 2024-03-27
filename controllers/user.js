/**
 * Contrôleur d'authentification et de gestion des utilisateurs pour l'application.
 * Ce module fournit des fonctionnalités essentielles pour la gestion des utilisateurs, incluant l'inscription, 
 * l'authentification, et la recherche d'utilisateurs ayant effectués au moins de location.
 * Il utilise bcrypt pour le hachage sécurisé des mots de passe et jwt pour la gestion des tokens d'authentification,
 * assurant ainsi la sécurité des informations de connexion des utilisateurs.
 * Les modèles User et Rental sont utilisés pour interagir avec la base de données et gérer les données relatives
 * aux utilisateurs et à leurs locations.
 */

// Importation des modèles représentant la structure des données en BDD pour les tables user et rental
const User   = require('../models/User');
const Rental = require('../models/Rental');

// Importation des modules `bcrypt` et `jsonwebtoken`.
// `bcrypt` est utilisé pour le hachage sécurisé des mots de passe.
// `jsonwebtoken` sert à créer et à vérifier les tokens JWT (JSON Web Tokens).
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

/**
 * Crée un nouvel utilisateur dans la base de données.
 * Hash le mot de passe fourni avant de sauvegarder l'utilisateur pour assurer la sécurité des données.
 * 
 * @param {Object} req - L'objet de la requête Express. `body` contient `pseudo`, `email`, `password`, et `role` de l'utilisateur.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
        const user = new User({
            pseudo   : req.body.pseudo,
            email    : req.body.email,
            password : hash,
            role     : req.body.role
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

/**
 * Authentifie un utilisateur.
 * Vérifie si l'utilisateur existe avec l'email fourni, puis compare le mot de passe fourni avec le hash stocké.
 * En cas de succès, renvoie l'ID de l'utilisateur et un token JWT.
 * 
 * @param {Object} req - L'objet de la requête Express. `body` doit contenir `email` et `password` de l'utilisateur.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id, userRole: user.role },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };

 /**
 * Trouve tous les utilisateurs qui ont effectué des locations.
 * Utilise l'identifiant unique des locataires pour trouver les utilisateurs correspondants dans la base de données.
 * 
 * @param {Object} req - L'objet de la requête Express.
 * @param {Object} res - L'objet de la réponse Express.
 * @param {Function} next - La fonction middleware à exécuter ensuite.
 */
 exports.findUsersWithRentals = (req, res, next) => {
    if(req.auth.userRole !== 'prestataire'){ return res.status(400).json( { error: "You must be prestataire to get users with rentals!" })};

    Rental.distinct('renter')
        .then(renterIds => {
            if (renterIds.length === 0) {
                return res.status(404).json({ message: "Aucun utilisateur n'a effectué de location." });
            }
            User.find({ _id: { $in: renterIds } })
                .then(users => res.status(200).json(users))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
  };