mapboxgl.accessToken = 'pk.eyJ1IjoidGF6ZWV5b3JlIiwiYSI6ImNqbGR3eXZtNjBnMzUzcHBibnAwbHg4dmQifQ._pXbjjmntf4YQ_DnkPijPQ';

// Initialize the map
const map = new mapboxgl.Map({
    container: 'map', // ID of the element in your HTML where the map is placed
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [-1.8683981, 50.7193677], // [longitude, latitude]
    zoom: 15
});

// Once the map is loaded, place a marker and attach a popup
map.on('load', () => {
    console.log('Map loaded');

    // Create a popup
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      '<h3>Wedding is here</h3>'
    );

    // Create a marker and set its position & popup
    const marker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat([-1.8683981, 50.7193677])
      .setPopup(popup) // Associate the popup with the marker
      .addTo(map);

    // If you'd like to automatically open the popup on load:
    // marker.togglePopup();
});

// Handle map errors
map.on('error', (error) => {
    console.error('Map error:', error);
});
