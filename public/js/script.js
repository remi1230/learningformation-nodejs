//******************************* VARIABLES GLOBALES *******************************//
let glo = {
  vehicles: {
    categories: [],
    vehicleIdToUpd: 0,
  },
};

//******************************* ÉVÈNEMENTS *******************************//
document.addEventListener("DOMContentLoaded", function() {
  if(this.location.pathname === '/test/vehicles'){
    getAllCategorieVehicle();
    getAllVehicle();
  }
});

//******************************* FONCTIONS *******************************//
const openWindow = endPoint => { window.open("http://localhost:3000/test/" + endPoint, "_blank"); };

function addListenerOnForm(formId, enPoint, method = 'POST'){
  let form = document.getElementById(formId);

  if(form){
      document.getElementById(formId).addEventListener('submit', function(e) {
      e.preventDefault();
      
      const token = localStorage.getItem('loginForm-token');
      if((formId === 'signupForm' || formId === 'loginForm') || token){
        var formData = new FormData(this);
      
        var object = {};
        formData.forEach((value, key) => { object[key] = value });
        var jsonData = JSON.stringify(object);

        const param = formId !== ('updateVehicleForm' && 'getVegicleDetailForm') ? '' : ('/' + glo.vehicles.vehicleIdToUpd);

        fetch('http://localhost:3000/' + enPoint + param, {
          method: method,
          headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: (formId !== 'getVegicleDetailForm' ? jsonData : undefined),
        })
        .then(response => response.json())
        .then(data => {
          for(let prop in data){
            localStorage.setItem(formId + '-' + prop, data[prop]);
          }
          console.log('Succès:', data);
        })
        .catch((error) => console.error('Erreur:', error));
      }
    });
  }
}

function getAllCategorieVehicle(){
  const token = localStorage.getItem('loginForm-token');
  if(token){
    fetch('http://localhost:3000/findAllCategorieVehicle', {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
          .then(response => response.json())
          .then(data => {
            glo.vehicles.categories = data;

            let categorieSelect = document.getElementById('category');
            let categoryForGetVegicleselect = document.getElementById('categoryForGetVegicles');
            let categoryForUpdVegicleselect = document.getElementById('categoryToUpd');

            categorieSelect.innerHTML = '';
            glo.vehicles.categories.forEach(categorie => {
              let option    = document.createElement('option');
              let optionTxt = document.createTextNode(categorie.libelle);

              option.value = categorie._id;
              option.appendChild(optionTxt);

              categorieSelect.appendChild(option);
              categoryForGetVegicleselect.appendChild(option.cloneNode(true));
              categoryForUpdVegicleselect.appendChild(option.cloneNode(true));
            });
            console.log('Succès:', data);
          })
          .catch((error) => console.error('Erreur:', error));
    }
}

function getAllVehicle(){
  const token = localStorage.getItem('loginForm-token');
  if(token){
    fetch(`http://localhost:3000/vehicles/all`, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
          .then(response => response.json())
          .then(data => {
            glo.vehicles.all = data;

            let vehicleSelect = document.getElementById('getVegicleDetail');

            vehicleSelect.innerHTML = '';
            glo.vehicles.all.forEach(vehicle => {
              let option    = document.createElement('option');
              let optionTxt = document.createTextNode(vehicle.libelle);

              option.value = vehicle._id;
              option.appendChild(optionTxt);

              vehicleSelect.appendChild(option);
            });

            console.log('Succès:', data);
          })
          .catch((error) => console.error('Erreur:', error));
    }
}

function getVehicleDetail(vehicleId){
  const token = localStorage.getItem('loginForm-token');
  if(token){
    fetch(`http://localhost:3000/vehicles/detail/${vehicleId}`, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
          .then(response => response.json())
          .then(data => {
            glo.vehicles.details = data;

            glo.vehicles.vehicleIdToUpd = vehicleId;

            document.getElementById('libelleToUpd').value     = data.libelle;
            document.getElementById('descriptionToUpd').value = data.description;
            document.getElementById('imageUrlToUpd').value    = data.imageUrl;
            document.getElementById('priceDayToUpd').value    = data.priceDay;
            document.getElementById('categoryToUpd').value    = data.category;
            
            console.log('Succès:', data);
          })
          .catch((error) => console.error('Erreur:', error));
    }
}

function getVehiclesByCategory(categoryVehicleId){
  const token = localStorage.getItem('loginForm-token');
  if(token){
    fetch(`http://localhost:3000/vehicles/category/${categoryVehicleId}`, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
          .then(response => response.json())
          .then(data => {
            glo.vehicles.byCategories = data;
            console.log('Succès:', data);
          })
          .catch((error) => console.error('Erreur:', error));
    }
}

//******************************* USERS *******************************//
addListenerOnForm('signupForm', 'signup');
addListenerOnForm('loginForm', 'login');

//******************************* VEHICLES *******************************//
addListenerOnForm('createCategorieForm', 'createCategorieVehicle');
addListenerOnForm('createVehicleForm', 'vehicles/add');
addListenerOnForm('updateVehicleForm', 'vehicles/update', 'PUT');
addListenerOnForm('getVegicleDetailForm', 'vehicles/delete', 'GET');