import { useState, useMemo, useCallback, Suspense } from 'react';
import styled from 'styled-components';
import DropdownMenu from '@/components/Map/DropdownMenu';
import MapWindow from '@/components/Map/MapWindow';
import PlaceSection from '@/components/Map/PlaceSection';
import ToggleButton from '@/components/Map/ToggleButton';
import { Text } from '@/components/common/typography/Text';
import locationOptions from '@/utils/constants/LocationOptions';
import influencerOptions from '@/utils/constants/InfluencerOptions';
import { LocationData, PlaceInfo } from '@/types';
import Loading from '@/components/common/layouts/Loading';

export default function MapPage() {
  const [selectedInfluencer, setSelectedInfluencer] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<{ main: string; sub?: string; lat?: number; lng?: number }>({
    main: '',
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<PlaceInfo[]>([]);

  const [mapBounds, setMapBounds] = useState<LocationData>({
    topLeftLatitude: 0,
    topLeftLongitude: 0,
    bottomRightLatitude: 0,
    bottomRightLongitude: 0,
  });

  const filters = useMemo(
    () => ({
      categories: selectedCategories,
      influencers: selectedInfluencer ? [selectedInfluencer] : [],
      location: selectedLocation,
    }),
    [selectedCategories, selectedInfluencer, selectedLocation],
  );

  const handleInfluencerChange = (value: { main: string; sub?: string; lat?: number; lng?: number }) => {
    setSelectedInfluencer(value.main);
  };

  const handleLocationChange = (value: { main: string; sub?: string; lat?: number; lng?: number }) => {
    setSelectedLocation(value);
  };

  const handleCategorySelect = (selected: string[]) => {
    setSelectedCategories(selected);
  };

  const handleBoundsChange = useCallback((bounds: LocationData) => {
    setMapBounds(bounds);
  }, []);

  const handlePlacesUpdate = (updatedPlaces: PlaceInfo[]) => {
    setFilteredPlaces(updatedPlaces);
  };

  const mapCenter = useMemo(
    () => ({
      lat: selectedLocation.lat ?? 37.5665,
      lng: selectedLocation.lng ?? 126.978,
    }),
    [selectedLocation],
  );

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
      <MapWindow onBoundsChange={handleBoundsChange} center={mapCenter} places={filteredPlaces} />
      <Suspense fallback={<Loading size={50} />}>
        <PlaceSection mapBounds={mapBounds} filters={filters} onPlacesUpdate={handlePlacesUpdate} />
      </Suspense>
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
