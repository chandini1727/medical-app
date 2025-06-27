import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const PharmacyLocator = () => {
  const [location, setLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [error, setError] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setMapCenter({ lat: latitude, lng: longitude });
        },
        (err) => setError('Unable to get location: ' + err.message)
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (location) {
      // Use Google Places API to find nearby pharmacies
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      const request = {
        location: new window.google.maps.LatLng(location.latitude, location.longitude),
        radius: '5000',
        type: ['pharmacy']
      };
      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPharmacies(results.map(p => ({
            name: p.name,
            address: p.vicinity,
            location: { lat: p.geometry.location.lat(), lng: p.geometry.location.lng() }
          })));
        }
      });
    }
  }, [location]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pharmacy Locator</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {location && <p>Your location: {location.latitude}, {location.longitude}</p>}
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={12}
        >
          {pharmacies.map((pharmacy, index) => (
            <Marker
              key={index}
              position={pharmacy.location}
              title={pharmacy.name}
              onClick={() => setSelectedPharmacy(pharmacy)}
            />
          ))}
          {selectedPharmacy && (
            <InfoWindow
              position={selectedPharmacy.location}
              onCloseClick={() => setSelectedPharmacy(null)}
            >
              <div>
                <h3>{selectedPharmacy.name}</h3>
                <p>{selectedPharmacy.address}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default PharmacyLocator;