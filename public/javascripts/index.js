function initMap() {
  const domElement = document.getElementById("map");

  if (!domElement) { return; }

  window.map = new MyMap(domElement);
  window.map.init();
  window.map.addSearch("pac-input");

  if (navigator.geolocation) {
    centerMapOnBrowser();
  }

}


function centerMapOnBrowser() {
  navigator.geolocation.getCurrentPosition((position) => {
    window.map.googleMap.setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });
  })   
}

$(".card.categories").click(function() {
  const category = this.dataset.category;

  $(this).toggleClass('selected');

  if ($(this).hasClass('selected')) {    
    const newInput = document.createElement('input');
    newInput.classList.add("category-input");

    newInput.name = 'interests';
    newInput.value = category;
    newInput.id = `category-${category}`;
    newInput.display = 'none';

    $("#categories-form").append(newInput);
  } else {
    $(`#categories-form #category-${category}`).remove();
  }
})


//axios de apuntarse a evento:

/*
const restCountriesApi = axios.create({
  baseURL: 'https://restcountries.eu/rest/v2/name/'
});

function getCountryInfo(theName) {
  restCountriesApi.get(theName)
  .then(responseFromAPI => {
      console.log('Response from API is: ', responseFromAPI.data);           
})
.catch(err => {
  console.log('Error is: ', err);
  })
}
*/

function getUserJoined() {
  document.getElementById("join-button").onclick = function(){
    console.log('entra a getUserJoined');
  }
} 
