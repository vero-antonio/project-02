function initMap() {
  const domElement = document.getElementById("map");

  if (!domElement) { return; }

  window.map = new MyMap(domElement);
  window.map.init();
  window.map.addSearch("pac-input");

  if (navigator.geolocation) {
    centerMapOnBrowser();
  }

  // if (document.getElementById("event-list")) {
  //   console.log(req.body);
  // }

  // if (document.getElementById("create-event")) {
  //   if (window.map.markers.length > 0) {
  //     let lat = window.map.markers[0].position.lat;
  //     console.log('hola');
  //     document.getElementById('latitude').value = lat.toFixed(3);
  //   //   document.getElementById('longitude').value = lng.toFixed(3);

  //   }

  //   window.map.onClick((event) => {
  //     if (window.map.markers.length === 0) {
  //       window.map.addMarker(event.latLng.lat(), event.latLng.lng());
  //     } else {
  //       window.map.clearMarkers();
  //       window.map.addMarker(event.latLng.lat(), event.latLng.lng());
  //     }
  //   })
  // }
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
