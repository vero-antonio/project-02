function initMap() {
  const domElement = document.getElementById("map");

  if (!domElement) { return; }

  window.map = new MyMap(domElement);
  window.map.init();
  window.map.addSearch("pac-input");

  if (navigator.geolocation) {
    centerMapOnBrowser();
  }

  // //means we are on create users page!
  // if (document.getElementById("create-event")) {
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

    newInput.name = 'interests';
    newInput.value = category;
    newInput.id = `category-${category}`;
    newInput.display = 'none';

    $("#categories-form").append(newInput);
  } else {
    $(`#categories-form #category-${category}`).remove();
  }
})
