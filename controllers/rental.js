const Rental = require('../models/Rental');

exports.findRentalsByRenter = (req, res, next) => {
    const renterId = req.params.renterId;

    Rental.find({ renter: renterId })
        .populate('vehicle', 'libelle')
        .populate('renter', 'pseudo')
        .then(rentals => {
        if (!rentals) {
            return res.status(404).json({ message: 'Aucun véhicule dans cette catégorie.' });
        }
        res.status(200).json(rentals);
        })
        .catch(error => {
        res.status(500).json({ error });
        });
};

 exports.findRentalsByVehicle = (req, res, next) => {
    const vehicleId = req.params.vehicleId;

    Rental.find({ vehicle: vehicleId })
        .populate('vehicle', 'libelle')
        .populate('renter', 'pseudo')
        .then(rentals => {
        if (!rentals) {
            return res.status(404).json({ message: 'Aucun véhicule dans cette catégorie.' });
        }
        res.status(200).json(rentals);
        })
        .catch(error => {
        res.status(500).json({ error });
        });
};

exports.addRental = (req, res, next) => {
    const rentalObject = JSON.parse(req.body.rental);
    delete rentalObject._id;
    const rental = new Rental({...rentalObject, renter: req.auth.userId});
  
    rental.save()
    .then(() => { res.status(201).json({message: 'Véhicule enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };

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