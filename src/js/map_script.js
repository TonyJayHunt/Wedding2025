mapboxgl.accessToken = 'pk.eyJ1IjoidGF6ZWV5b3JlIiwiYSI6ImNqbGR3eXZtNjBnMzUzcHBibnAwbHg4dmQifQ._pXbjjmntf4YQ_DnkPijPQ';

// Initialize the map
const map = new mapboxgl.Map({
    container: 'map', // Specify the container ID from your HTML
    style: 'mapbox://styles/mapbox/streets-v11', // Replace with your desired map style
    center: [-1.8683981, 50.7193677], // Replace with your desired center coordinates [longitude, latitude]
    zoom: 20 // Adjust the zoom level as needed
});

// Handle map load and errors
map.on('load', () => {
    console.log('Map loaded');
});

map.on('error', (error) => {
    console.error('Map error:', error);
});
