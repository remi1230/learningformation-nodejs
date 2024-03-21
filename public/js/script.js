//******************************* VARIABLES GLOBALES *******************************//
let glo = {
  vehicles: {
    categories: [],
    vehicleIdToUpd: 0,
  },
  rentals: {
    usersWithRentals: [],
    rentals: [],
    rentalIdToUpd: 0,
  },
  comments:{

  }
};

//******************************* ÉVÈNEMENTS *******************************//
document.addEventListener("DOMContentLoaded", function() {
  if(this.location.pathname === '/test/vehicles'){
    getAllCategorieVehicle();
    getAllVehicle();
  }
  else if(this.location.pathname === '/test/rentals'){
    getAllVehicle([document.getElementById('vehicle'), document.getElementById('vehicleToUpd'), document.getElementById('vehicleForGetRentals')]);
    getRenters();
    getRentals();
  }
  else if(this.location.pathname === '/test/comments'){
    document.getElementById('commentDate').value = dayDateToUSString();
    getAllVehicle([document.getElementById('vehicle'), document.getElementById('vehicleForGetComments')]);
  }
});

//******************************* FONCTIONS *******************************//
const openWindow        = endPoint => { window.open("http://localhost:3000/test/" + endPoint, "_blank"); };
const formatRenterInfos = rental   => rental.renter.pseudo + ' - ' + rental.vehicle.libelle + ' - ' + rental.startDate + ' - ' + rental.endDate;
const dayDateToUSString = () => { const d = (new Date()).toLocaleDateString(); return d.slice(-4) + '-' + d.slice(3,5) + '-' + d.slice(0,2) };

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

        let param = formId !== ('updateVehicleForm' && 'getVegicleDetailForm') ? '' : ('/' + glo.vehicles.vehicleIdToUpd);
        if(formId === 'updateRentalForm'){ param = '/' + glo.rentals.rentalIdToUpd; }

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

function getAllVehicle(vehicleSelect = document.getElementById('getVegicleDetail')){
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

            vehicleSelect.innerHTML = '';
            glo.vehicles.all.forEach(vehicle => {
              let option    = document.createElement('option');
              let optionTxt = document.createTextNode(vehicle.libelle);

              option.value = vehicle._id;
              option.appendChild(optionTxt);

              if(!Array.isArray(vehicleSelect)){ vehicleSelect.appendChild(option); }
              else{ vehicleSelect.forEach(vehSelect => { vehSelect.appendChild(option.cloneNode(true)); }); }
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

function getRentalDetail(rentalId){
  const token = localStorage.getItem('loginForm-token');
  if(token){
    fetch(`http://localhost:3000/rental/getRentalDetails/${rentalId}`, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
          .then(response => response.json())
          .then(data => {
            glo.rentals.details = data;

            glo.rentals.rentalIdToUpd = rentalId;

            document.getElementById('rentalToUpd').value    = data._id;
            document.getElementById('vehicleToUpd').value   = data.vehicle._id;
            document.getElementById('startDateToUpd').value = data.startDate.slice(0, 10);
            document.getElementById('endDateToUpd').value   = data.endDate.slice(0, 10);
            document.getElementById('statusToUpd').value    = data.status;
            
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

function getRentalsByRenter(renterId){
  const token = localStorage.getItem('loginForm-token');
  if(token){
    fetch(`http://localhost:3000/rental/findByRenter/${renterId}`, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
          .then(response => response.json())
          .then(data => {
            glo.rentals.byRenter = data;
            console.log('Succès:', data);
          })
          .catch((error) => console.error('Erreur:', error));
    }
}

function getRentalsByVehicle(vehicleId){
  const token = localStorage.getItem('loginForm-token');
  if(token){
    fetch(`http://localhost:3000/rental/findByVehicle/${vehicleId}`, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
          .then(response => response.json())
          .then(data => {
            glo.rentals.byVehicle = data;
            console.log('Succès:', data);
          })
          .catch((error) => console.error('Erreur:', error));
    }
}

function getCommentsByVehicle(vehicleId){
  const token = localStorage.getItem('loginForm-token');
  if(token){
    fetch(`http://localhost:3000/comment/${vehicleId}`, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
          .then(response => response.json())
          .then(data => {
            glo.comments.byVehicle = data;
            console.log('Succès:', data);
          })
          .catch((error) => console.error('Erreur:', error));
    }
}

function getRenters(){
  const token = localStorage.getItem('loginForm-token');
  if(token){
    fetch(`http://localhost:3000/rental/findUsersWithRentals`, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
          .then(response => response.json())
          .then(data => {
            if(Array.isArray(data)){
              glo.rentals.usersWithRentals = data;

              let rentalSelect = document.getElementById('rentalForGetRentals');
              rentalSelect.innerHTML = '';
              glo.rentals.usersWithRentals.forEach(renter => {
                let option    = document.createElement('option');
                let optionTxt = document.createTextNode(renter.pseudo);

                option.value = renter._id;
                option.appendChild(optionTxt);

                rentalSelect.appendChild(option);
              });
            }

            console.log('Succès:', data);
          })
          .catch((error) => console.error('Erreur:', error));
    }
}

function getRentals(){
  const token = localStorage.getItem('loginForm-token');
  if(token){
    fetch(`http://localhost:3000/rental/findAllRental`, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
          .then(response => response.json())
          .then(data => {
            if(Array.isArray(data)){
              glo.rentals.rentals = data;

              let rentalSelect = document.getElementById('rentalToUpd');
              rentalSelect.innerHTML = '';
              glo.rentals.rentals.forEach(rental => {
                let option    = document.createElement('option');
                let optionTxt = document.createTextNode(formatRenterInfos(rental));

                option.value = rental._id;
                option.appendChild(optionTxt);

                rentalSelect.appendChild(option);
              });
            }

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
addListenerOnForm('updateRentalForm', 'rental/update', 'PUT');
addListenerOnForm('getVegicleDetailForm', 'vehicles/delete', 'GET');
addListenerOnForm('createRentalForm', 'rental/add');
addListenerOnForm('createCommentForm', 'comment/add');