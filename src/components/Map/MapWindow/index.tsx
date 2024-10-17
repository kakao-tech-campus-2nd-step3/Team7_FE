import { useState, useCallback, useEffect, useRef } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { TbCurrentLocation } from 'react-icons/tb';
import Button from '@/components/common/Button';
import { LocationData, PlaceData } from '@/types';

interface MapWindowProps {
  onBoundsChange: (bounds: LocationData) => void;
  onCoordinateChange: (lat: string, lng: string) => void;
  center: { lat: number; lng: number };
  places: PlaceData[];
}

export default function MapWindow({ onBoundsChange, onCoordinateChange, center, places }: MapWindowProps) {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const updateBounds = useCallback(() => {
    if (!mapRef.current) return;

    const bounds = mapRef.current.getBounds();
    const newBounds: LocationData = {
      topLeftLatitude: bounds.getNorthEast().getLat(),
      topLeftLongitude: bounds.getSouthWest().getLng(),
      bottomRightLatitude: bounds.getSouthWest().getLat(),
      bottomRightLongitude: bounds.getNorthEast().getLng(),
    };
    onBoundsChange(newBounds);
  }, [onBoundsChange]);

  const handleSearchNearby = useCallback(() => {
    updateBounds();
  }, [updateBounds]);

  const handleResetCenter = useCallback(() => {
    if (mapRef.current && userLocation) {
      mapRef.current.setCenter(new kakao.maps.LatLng(userLocation.lat, userLocation.lng));
      updateBounds();
    }
  }, [userLocation, updateBounds]);

  const handleCenterChanged = (map: kakao.maps.Map) => {
    const newCenter = map.getCenter();
    const newLat = newCenter.getLat();
    const newLng = newCenter.getLng();
    setMapCenter({
      lat: newLat,
      lng: newLng,
    });
    onCoordinateChange(newLat.toString(), newLng.toString());
  };

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (position) => {
        const newCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMapCenter(newCenter);
        setUserLocation(newCenter);
        mapRef.current?.setCenter(new kakao.maps.LatLng(newCenter.lat, newCenter.lng));
        updateBounds();
      },
      (err) => console.error('Geolocation error:', err),
    );
  }, [updateBounds]);

  useEffect(() => {
    setMapCenter(center);
    if (mapRef.current) {
      mapRef.current.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
      updateBounds();
    }
  }, [center, updateBounds]);

  return (
    <MapContainer>
      <ButtonContainer>
        <Button onClick={handleSearchNearby} variant="mint" size="small" style={{ margin: '5px', fontSize: '16px' }}>
          주변 찾기
        </Button>
      </ButtonContainer>
      <Map
        center={mapCenter}
        style={{ width: '100%', height: '100%' }}
        level={4}
        onCreate={(map: kakao.maps.Map | null) => {
          mapRef.current = map;
        }}
        onCenterChanged={handleCenterChanged}
        onZoomChanged={updateBounds}
        onDragEnd={updateBounds}
      >
        {userLocation && (
          <MapMarker
            position={userLocation}
            image={{
              src: 'https://i.ibb.co/4gGFjRx/circle.png',
              size: { width: 24, height: 24 },
            }}
          />
        )}
        {places.map((place) => (
          <MapMarker key={place.placeId} position={{ lat: Number(place.latitude), lng: Number(place.longitude) }} />
        ))}
      </Map>
      <ResetButtonContainer>
        <Button
          onClick={handleResetCenter}
          variant="white"
          size="small"
          style={{ width: '30px', height: '30px', boxShadow: '0px 2px 2px #707070' }}
        >
          <TbCurrentLocation size={20} />
        </Button>
      </ResetButtonContainer>
    </MapContainer>
  );
}

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 570px;
  padding: 10px 0;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const ResetButtonContainer = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  z-index: 10;
`;
