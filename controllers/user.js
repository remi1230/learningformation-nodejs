const User   = require('../models/User');
const Rental = require('../models/Rental');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

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

 exports.findUsersWithRentals = (req, res, next) => {
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