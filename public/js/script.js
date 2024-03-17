const openWindow = endPoint => { window.open("http://localhost:3000/test/" + endPoint, "_blank"); };

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var formData = new FormData(this);
  
    var object = {};
    formData.forEach((value, key) => { object[key] = value });
    var jsonData = JSON.stringify(object);
  
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData
    })
    .then(response => response.json())
    .then(data => console.log('Succès:', data))
    .catch((error) => console.error('Erreur:', error));
});