import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PlaceItem from '@/components/Map/PlaceSection/PlaceItem';
import { PlaceData, LocationData } from '@/types';
import { useGetPlaceList } from '@/api/hooks/useGetPlaceList';

interface PlaceSectionProps {
  mapBounds: LocationData;
  filters: {
    categories: string[];
    influencers: string[];
    location: { main: string; sub?: string; lat?: number; lng?: number };
  };
  onPlacesUpdate: (places: PlaceData[]) => void;
  longitude: string;
  latitude: string;
}

export default function PlaceSection({ mapBounds, filters, onPlacesUpdate, longitude, latitude }: PlaceSectionProps) {
  const navigate = useNavigate();
  const { data: placeList } = useGetPlaceList(mapBounds, filters, longitude, latitude);

  const filteredPlaces = useMemo(() => {
    if (!placeList) return [];
    const filtered = placeList.filter((place: PlaceData) => {
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
    onPlacesUpdate(filtered);
    return filtered;
  }, [placeList, filters, onPlacesUpdate]);

  const handlePlaceClick = (placeId: number) => {
    navigate(`/detail/${placeId}`);
  };

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
