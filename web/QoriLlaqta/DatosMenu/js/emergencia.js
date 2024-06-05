let map;
let marker;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -12.046374, lng: -77.042793 },
        zoom: 15
    });

    map.addListener('click', function(event) {
        placeMarker(event.latLng);
    });

    document.getElementById('current-location').addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
                placeMarker(pos);
                setAddress(pos);
            });
        }
    });

    document.getElementById('search-address').addEventListener('click', function() {
        const address = document.getElementById('address').value;
        if (address) {
            geocodeAddress(address);
        }
    });
}

function placeMarker(location) {
    if (marker) {
        marker.setPosition(location);
    } else {
        marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }
    setAddress(location);
}

function setAddress(location) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': location }, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                document.getElementById('address').value = results[0].formatted_address;
            }
        }
    });
}

function geocodeAddress(address) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            map.setCenter(location);
            placeMarker(location);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Obtener el elemento select
    var selectElement = document.getElementById("country-code");
  
    // Fetch del archivo JSON
    fetch("../json/countries.json")
      .then(response => response.json())
      .then(data => {
        // Iterar sobre los datos del JSON
        data.forEach(country => {
          // Crear una nueva opción para cada país
          var option = document.createElement("option");
          option.value = country.prefix;
          option.textContent = `${country.prefix} (${country.code})`;
          // Agregar la opción al select
          selectElement.appendChild(option);
        });
      })
      .catch(error => console.error("Error fetching countries:", error));
});
