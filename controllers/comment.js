const Comment = require('../models/Comment');

exports.findCommentsByVehicle = (req, res, next) => {
    const veiculeId = req.params.veiculeId;

    Comment.find({ vehicle: veiculeId })
        .populate('vehicle', 'libelle')
        .populate('author', 'pseudo')
        .then(comments => {
        if (!comments) {
            return res.status(404).json({ message: 'Aucun commentaire pour ce véhicule.' });
        }
        res.status(200).json(comments);
        })
        .catch(error => {
        res.status(500).json({ error });
        });
};

exports.addComment = (req, res, next) => {
    const commentObject = JSON.parse(req.body.comment);
    delete commentObject._id;
    const comment = new Comment({...commentObject, prestataire: req.auth.userId});
  
    comment.save()
    .then(() => { res.status(201).json({message: 'Véhicule enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };
