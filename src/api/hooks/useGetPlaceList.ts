import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { LocationData, FilterParams, PlaceData, PlaceList } from '@/types';

export const getPlaceList = async (
  location: LocationData,
  filters: FilterParams,
  center: { lat: number; lng: number },
): Promise<PlaceData[]> => {
  const { topLeftLongitude, topLeftLatitude, bottomRightLongitude, bottomRightLatitude } = location;
  const { categories, influencers, longitude, latitude } = filters;

  const params = new URLSearchParams({
    topLeftLongitude: topLeftLongitude.toString(),
    topLeftLatitude: topLeftLatitude.toString(),
    bottomRightLongitude: bottomRightLongitude.toString(),
    bottomRightLatitude: bottomRightLatitude.toString(),
    longitude: center.lng.toString(),
    latitude: center.lat.toString(),
    page: '0',
    categories: categories.join(','),
    influencers: influencers.join(','),

    longitude: longitude || '',
    latitude: latitude || '',
  });
  const response = await fetchInstance.get<PlaceList>(`/places?${params}`);
  console.log('Sending request to /places with params:', params.toString());

  return response.data.places;
};

export const useGetPlaceList = (
  location: LocationData,
  filters: FilterParams,
  center: { lat: number; lng: number },
  enabled: boolean,
) => {
  return useQuery<PlaceData[], Error>({
    queryKey: ['placeList', location, filters, center],
    queryFn: () => getPlaceList(location, filters, center),
    staleTime: 1000 * 60 * 5,
    enabled,
  });
};
