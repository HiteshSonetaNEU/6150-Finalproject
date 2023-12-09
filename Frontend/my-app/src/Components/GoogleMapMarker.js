import { useEffect } from 'react';

const GoogleMapMarker = () => {
  useEffect(() => {
    let map;

    const initMap = async () => {
      // The location of Uluru
      const position = { lat: 42.33858597646033, lng: -71.09012994141239 };

      // Request needed libraries.
      const { Map } = await window.google.maps.importLibrary('maps');
      const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker');

      // The map, centered at Uluru
      map = new Map(document.getElementById('map'), {
        zoom: 15,
        center: position,
        mapId: 'DEMO_MAP_ID',
      });

      // The marker, positioned at Uluru
      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: 'Uluru',
      });
    };

    const loadGoogleMapsAPI = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBc6z0_1Y7CT03ChY7-ty8OvpqNOayySqI&v=weekly`;
      script.async = true;
      script.defer = true;
      script.nonce = document.querySelector('script[nonce]')?.nonce || '';
      script.onload = initMap;
      script.onerror = () => console.error('Error loading Google Maps API');
      document.head.appendChild(script);
    };

    loadGoogleMapsAPI();

    // Cleanup function
    return () => {
      // Dispose of the map to prevent memory leaks
      if (map) {
        // map.dispose();
      }
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

};

export default GoogleMapMarker;