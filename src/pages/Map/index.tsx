import { useState, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import DropdownMenu from '@/components/Map/DropdownMenu';
import MapWindow from '@/components/Map/MapWindow';
import PlaceSection from '@/components/Map/PlaceSection';
import ToggleButton from '@/components/Map/ToggleButton';
import { Text } from '@/components/common/typography/Text';
import locationOptions from '@/utils/constants/LocationOptions';
import influencerOptions from '@/utils/constants/InfluencerOptions';
import { LocationData, PlaceData } from '@/types';

export default function MapPage() {
  const [selectedInfluencer, setSelectedInfluencer] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<{ main: string; sub?: string; lat?: number; lng?: number }>({
    main: '',
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<PlaceData[]>([]);
  const [center, setCenter] = useState({ lat: 37.5665, lng: 126.978 });
  const [mapBounds, setMapBounds] = useState<LocationData>({
    topLeftLatitude: 0,
    topLeftLongitude: 0,
    bottomRightLatitude: 0,
    bottomRightLongitude: 0,
  });
  const [shouldFetchPlaces, setShouldFetchPlaces] = useState(false);
  const [initialLocation, setInitialLocation] = useState(false);

  const filters = useMemo(
    () => ({
      categories: selectedCategories,
      influencers: selectedInfluencer ? [selectedInfluencer] : [],
      location: selectedLocation,
    }),
    [selectedCategories, selectedInfluencer, selectedLocation],
  );

  const handleInfluencerChange = useCallback((value: { main: string; sub?: string; lat?: number; lng?: number }) => {
    setSelectedInfluencer(value.main);
    setShouldFetchPlaces(true);
  }, []);

  const handleLocationChange = useCallback((value: { main: string; sub?: string; lat?: number; lng?: number }) => {
    setSelectedLocation(value);
    if (value.lat && value.lng) {
      setCenter({ lat: value.lat, lng: value.lng });
    }
    setShouldFetchPlaces(true);
  }, []);

  const handleCategorySelect = useCallback((selected: string[]) => {
    setSelectedCategories(selected);
    setShouldFetchPlaces(true);
  }, []);

  const handleBoundsChange = useCallback((bounds: LocationData) => {
    setMapBounds(bounds);
  }, []);

  const handleCenterChange = useCallback((newCenter: { lat: number; lng: number }) => {
    setCenter(newCenter);
  }, []);

  const handlePlacesUpdate = useCallback((updatedPlaces: PlaceData[]) => {
    setFilteredPlaces(updatedPlaces);
  }, []);

  const handleSearchNearby = useCallback(() => {
    setShouldFetchPlaces(true);
  }, []);

  const handleInitialLocation = useCallback((value: boolean) => {
    setInitialLocation(value);
    if (value) {
      setShouldFetchPlaces(true);
    }
  }, []);

  const handleFetchComplete = useCallback(() => {
    setShouldFetchPlaces(false);
  }, []);

  return (
    <PageContainer>
      <Text size="l" weight="bold" variant="white">
        지도
      </Text>
      <DropdownContainer>
        <DropdownMenu
          options={locationOptions}
          multiLevel
          onChange={handleLocationChange}
          placeholder="위치"
          type="location"
        />
        <DropdownMenu
          options={influencerOptions}
          onChange={handleInfluencerChange}
          placeholder="인플루언서"
          type="influencer"
        />
      </DropdownContainer>
      <ToggleButton options={['맛집', '카페', '팝업']} onSelect={handleCategorySelect} />
      <MapWindow
        onBoundsChange={handleBoundsChange}
        onCenterChange={handleCenterChange}
        onSearchNearby={handleSearchNearby}
        onInitialLocation={handleInitialLocation}
        center={center}
        places={filteredPlaces}
      />
      <PlaceSection
        mapBounds={mapBounds}
        filters={filters}
        onPlacesUpdate={handlePlacesUpdate}
        center={center}
        shouldFetchPlaces={shouldFetchPlaces}
        onFetchComplete={handleFetchComplete}
        initialLocation={initialLocation}
      />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  padding: 6px 0;
`;

const DropdownContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
  padding-top: 16px;
`;
