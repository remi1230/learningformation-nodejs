const CategorieVehicle = require('../models/CategorieVehicle');

exports.findAllCategorieVehicle = (req, res, next) => {
    CategorieVehicle.find().then(
    (categorieVehicles) => {
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

exports.createCategorieVehicle = (req, res, next) => {
    const categorieVehicleObject = JSON.parse(req.body.categorieVehicle);
    delete categorieVehicleObject._id;
    const categorieVehicle = new CategorieVehicle({...categorieVehicleObject});
  
    categorieVehicle.save()
    .then(() => { res.status(201).json({message: 'Véhicule enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };