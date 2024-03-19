//******************************* VARIABLES GLOBALES *******************************//
let glo = {
  vehicles: {
    categories: [],
  },
};

//******************************* ÉVÈNEMENTS *******************************//
document.addEventListener("DOMContentLoaded", function() {
  if(this.location.pathname === '/test/vehicles'){ getAllCategorieVehicle(); }
});

//******************************* FONCTIONS *******************************//
const openWindow = endPoint => { window.open("http://localhost:3000/test/" + endPoint, "_blank"); };

function addListenerOnForm(formId, enPoint){
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

        fetch('http://localhost:3000/' + enPoint, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: jsonData
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

            let categorieSelect = document.getElementById('categorie');

            categorieSelect.innerHTML = '';
            glo.vehicles.categories.forEach(categorie => {
              let option    = document.createElement('option');
              let optionTxt = document.createTextNode(categorie.libelle);

              option.value = categorie.libelle;
              option.appendChild(optionTxt);

              categorieSelect.appendChild(option);
            });
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