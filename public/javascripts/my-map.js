class MyMap {
  constructor(containerDomElement) {
    this.containerDomElement = containerDomElement;
    this.googleMap = null;
    this.markers = [];
  }

  init() {
    const sol = {
      lat: 40.416732,
      lng: -3.703636
    }
    this.googleMap = new google.maps.Map(this.containerDomElement, {
      zoom: 16,
      center: sol
    });
  }

  addMarker(lat, lng, id) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.googleMap,
      id: id
    });

    this.markers.push(marker);
  }


  

  setMapOnAll(map) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
  clearMarkers() {
    this.markers.forEach(m => m.setMap(null));
    this.markers = [];
  }

  onClick(cb) {
    this.googleMap.addListener('click', cb);
  }

  addSearch(searchBoxId) {
    const input = document.getElementById(searchBoxId);

    const searchBox = new google.maps.places.SearchBox(input);

    this.googleMap.addListener("bounds_changed", () => {
      searchBox.setBounds(this.googleMap.getBounds())
    })

    searchBox.addListener("places_changed", () => {
      this.clearMarkers();

      const places = searchBox.getPlaces();

      if (places.length === 0) return;

      places.forEach(place => {
        this.addMarker(place.geometry.location.lat(), place.geometry.location.lng());

        this.googleMap.setCenter(place.geometry.location);
      })
    });
  }

  showOnlyMarker(markerId) {
    this.markers.forEach(marker => {
      if (marker.id !== markerId) {
        marker.setMap(null);
      }
    })
  }

  showAllMarkers() {
    this.markers.forEach(marker => marker.setMap(this.googleMap));
  }
}