const Comment = require('../models/Comment');

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

exports.addComment = (req, res, next) => {
    const commentObject = req.body;
    delete commentObject._id;
    const comment = new Comment({...commentObject, author: req.auth.userId});
  
    comment.save()
    .then(() => { res.status(201).json({message: 'Comment saved !'})})
    .catch(error => { res.status(400).json( { error })})
 };
