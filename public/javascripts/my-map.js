class MyMap {
  constructor(containerDomElement) {
    this.containerDomElement = containerDomElement;
    this.googleMap = null;
    this.markers = [];
    this.bounds = new google.maps.LatLngBounds();
  }

  init() {
    this.googleMap = new google.maps.Map(this.containerDomElement, {
      zoom: 15,
      center: { lat: 40.416732, lng: -3.703636 },
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#263c3f"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6b9a76"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#38414e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#212a37"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9ca5b3"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#1f2835"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#f3d19c"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2f3948"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#515c6d"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        }
      ]           
    });

    if (window.eventPoints && window.eventPoints.length > 0) {
      this.showAllMarkers();
    }


    if (window.eventPoint) {
      this.addMarker(window.eventPoint[0], window.eventPoint[1]);
      this.googleMap.setCenter(new google.maps.LatLng(window.eventPoint[0], window.eventPoint[1]), 10);
    }
  }
  

  addMarker(lat, lng, id, name) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      lat: lat,
      lng: lng,
      map: this.googleMap,
      id: id ,
      zoom: 12 ,
      name: name
    });

    const infowindow = new google.maps.InfoWindow({
      content: `<b>${name}</b>`,
      maxWidth: 200
    });
    
    marker.addListener('mouseover', function() {
      infowindow.open(map, marker);
    });

    marker.addListener('mouseout', function() {
      infowindow.close();
    });  

    if (id) {
      marker.addListener('click', function() {
        window.location = `/events/detail/${id}`
      });
    }


    var markerBound = new google.maps.LatLng(lat, lng);
    this.bounds.extend(markerBound);

    this.markers.push(marker);


    marker.addListener('click', function() {
      console.log(this.id);
    });

  }


  setMapOnAll(map) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
  clearMarkers() {
    this.markers.forEach(m => m.setMap(null));
    this.markers = [];
    console.log("cleared");
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

        if (!window.eventPoints) {
          this.googleMap.setCenter(place.geometry.location);
        }

        //means we are on create users page!
        if (document.getElementById("event-create")) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          document.getElementById('latitude').value = lat.toFixed(3);
          document.getElementById('longitude').value = lng.toFixed(3);
        }
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
    window.eventPoints.forEach((point) => {
      this.addMarker(point.coordinates[0], point.coordinates[1], point.id, point.name);
    });

    this.googleMap.fitBounds(this.bounds);
  }
}