const CategorieVehicle = require('../models/CategoryVehicle');

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
    //const categorieVehicleObject = JSON.parse(req.body.categorieVehicle);
    //delete categorieVehicleObject._id;
    const libelle = req.body.libelle;
    const categorieVehicle = new CategorieVehicle({libelle: libelle});
  
    categorieVehicle.save()
    .then(() => { res.status(201).json({message: 'Catégorie de véhicule enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };