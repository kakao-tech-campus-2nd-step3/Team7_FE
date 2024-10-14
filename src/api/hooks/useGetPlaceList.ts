import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { LocationData, FilterParams, PlaceData } from '@/types';

export const getPlaceList = async (
  location: LocationData,
  filters: FilterParams,
  longitude: string,
  latitude: string,
) => {
  const { topLeftLongitude, topLeftLatitude, bottomRightLongitude, bottomRightLatitude } = location;
  const { categories, influencers } = filters;

  const params = new URLSearchParams({
    topLeftLongitude: topLeftLongitude.toString(),
    topLeftLatitude: topLeftLatitude.toString(),
    bottomRightLongitude: bottomRightLongitude.toString(),
    bottomRightLatitude: bottomRightLatitude.toString(),
    longitude,
    latitude,
    page: '0',
    categories: categories.join(','),
    influencers: influencers.join(','),
  });

  const response = await fetchInstance.get<PlaceData[]>(`/places?${params}`);
  console.log('Sending request to /places with params:', params.toString());

  return response.data;
};

export const useGetPlaceList = (location: LocationData, filters: FilterParams, longitude: string, latitude: string) => {
  return useSuspenseQuery({
    queryKey: ['placeList', location, filters, longitude, latitude],
    queryFn: () => getPlaceList(location, filters, longitude, latitude),
    staleTime: 1000 * 60 * 5,
  });
};
