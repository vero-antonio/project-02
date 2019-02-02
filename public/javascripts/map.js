class Map {
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
    // new google.maps.Marker({
    //   position: sol,
    //   map: this.googleMap,
    // });
  }

  addMarker(lat, lng, id) {
    new google.maps.Marker({
      position: { lat, lng },
      map: this.googleMap,
      id: id
    });
  }



  //   this.markers.push(marker);
  // }

//   clearMarkers() {
//     this.markers.forEach(m => m.setMap(null));
//     this.markers = [];
//   }

  onClick(cb) {
    this.googleMap.addListener('click', cb);
  }

//   showOnlyMarker(markerId) {
//     this.markers.forEach(marker => {
//       if (marker.id !== markerId) {
//         marker.setMap(null);
//       }
//     })
//   }

//   showAllMarkers() {
//     this.markers.forEach(marker => marker.setMap(this.googleMap));
//   }
}