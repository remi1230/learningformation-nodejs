const Vehicle = require('../models/Vehicle');

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

exports.getVehicleDetails = (req, res, next) => {
    const vehicleId = req.params.id;
    
    Vehicle.findById(vehicleId)
      //.select('description')
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

exports.addVehicle = (req, res, next) => {
    const vehicleObject = req.body;
    delete vehicleObject._id;
    const vehicle = new Vehicle({...vehicleObject, prestataire: req.auth.userId});
  
    vehicle.save()
    .then(() => { res.status(201).json({message: 'Véhicule enregistré !'})})
    .catch(error => { res.status(400).json( { error, reqBody: req.body })})
 };

 exports.updateVehicle = (req, res, next) => {
    const vehicleObject = req.file ? {
        ...JSON.parse(req.body.vehicle),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete vehicleObject._prestataire;
    Vehicle.findOne({_id: req.params.id})
        .then((vehicle) => {
            if (vehicle.prestataire != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Vehicle.updateOne({ _id: req.params.id}, { ...vehicleObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Véhicule modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteVehicle = (req, res, next) => {
    Vehicle.findOne({ _id: req.params.id})
        .then(vehicle => {
            if (vehicle.prestataire != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                /*const filename = vehicle.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Vehicle.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });*/
                Vehicle.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};