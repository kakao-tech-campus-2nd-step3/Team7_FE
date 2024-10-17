import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PlaceItem from '@/components/Map/PlaceSection/PlaceItem';
import { PlaceData, LocationData } from '@/types';
import { useGetPlaceList } from '@/api/hooks/useGetPlaceList';
import Loading from '@/components/common/layouts/Loading';

interface PlaceSectionProps {
  mapBounds: LocationData;
  filters: {
    categories: string[];
    influencers: string[];
    location: { main: string; sub?: string; lat?: number; lng?: number };
  };
  onPlacesUpdate: (places: PlaceData[]) => void;
  center: { lat: number; lng: number };
  shouldFetchPlaces: boolean;
  onFetchComplete: () => void;
}

export default function PlaceSection({
  mapBounds,
  filters,
  onPlacesUpdate,
  center,
  shouldFetchPlaces,
  onFetchComplete,
}: PlaceSectionProps) {
  const navigate = useNavigate();
  const previousPlacesRef = useRef<PlaceData[]>([]);

  const { data: places, isLoading, isError, error, refetch } = useGetPlaceList(mapBounds, filters, center, false);

  const filteredPlaces = useMemo(() => {
    const currentPlaces = places || previousPlacesRef.current;
    if (!currentPlaces) return [];

    const filtered = currentPlaces.filter((place: PlaceData) => {
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(place.category);
      const influencerMatch = filters.influencers.length === 0 || filters.influencers.includes(place.influencerName);
      const locationMatch = (() => {
        if (!filters.location.main) return true;
        const mainMatch =
          place.address.address1.includes(filters.location.main) ||
          place.address.address2.includes(filters.location.main);
        const subMatch = filters.location.sub
          ? place.address.address2.includes(filters.location.sub) ||
            (place.address.address3 && place.address.address3.includes(filters.location.sub))
          : true;
        return mainMatch && subMatch;
      })();
      return categoryMatch && influencerMatch && locationMatch;
    });

    previousPlacesRef.current = filtered;
    return filtered;
  }, [places, filters]);

  useEffect(() => {
    if (shouldFetchPlaces) {
      refetch().then(() => {
        onFetchComplete();
      });
    }
  }, [shouldFetchPlaces, refetch, onFetchComplete]);

  useEffect(() => {
    if (!isLoading) {
      onPlacesUpdate(filteredPlaces);
    }
  }, [filteredPlaces, onPlacesUpdate, isLoading]);

  const handlePlaceClick = (placeId: number) => {
    navigate(`/detail/${placeId}`);
  };

  if (isLoading) return <Loading size={50} />;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <ListContainer>
      {filteredPlaces.map((place) => (
        <PlaceItem key={place.placeId} {...place} onClick={() => handlePlaceClick(place.placeId)} />
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 40px 20px;
`;
