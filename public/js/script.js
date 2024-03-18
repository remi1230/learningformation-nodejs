let connectInfos = {};

const openWindow = endPoint => { window.open("http://localhost:3000/test/" + endPoint, "_blank"); };

function addListenerOnForm(formId, enPoint){
  document.getElementById(formId).addEventListener('submit', function(e) {
    e.preventDefault();
  
    var formData = new FormData(this);
  
    var object = {};
    formData.forEach((value, key) => { object[key] = value });
    var jsonData = JSON.stringify(object);
  
    fetch('http://localhost:3000/' + enPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData
    })
    .then(response => response.json())
    .then(data => { connectInfos[formId] = data; console.log('Succès:', data)})
    .catch((error) => console.error('Erreur:', error));
  });
}

//******************************* USERS *******************************//
addListenerOnForm('signupForm', 'signup');
addListenerOnForm('loginForm', 'login');

//******************************* VEHICLES *******************************//
