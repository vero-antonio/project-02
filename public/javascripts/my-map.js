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
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
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
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text",
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
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "stylers": [
            {
              "color": "#85bd72"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#c2d6a9"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#929000"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#9dd1e1"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
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
  

  addMarker(lat, lng, id, name, picture) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      lat: lat,
      lng: lng,
      map: this.googleMap,
      id: id ,
      zoom: 12 ,
      name: name,
      picture: picture
    });

    const infowindow = new google.maps.InfoWindow({
      content: `<img class="info-window-img" src="${picture}" alt="event image">
                <b>${name}</b>
                `,
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
        window.location = `/detail/${id}`
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
      this.addMarker(point.coordinates[0], point.coordinates[1], point.id, point.name, point.picture);
    });

    this.googleMap.fitBounds(this.bounds);
  }
}