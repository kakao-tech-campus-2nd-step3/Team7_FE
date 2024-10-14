import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';
import { LocationData, FilterParams, PlaceList } from '@/types';

export const getPlaceList = async (
  location: LocationData,
  filters: FilterParams & { longitude?: string; latitude?: string },
) => {
  const { topLeftLongitude, topLeftLatitude, bottomRightLongitude, bottomRightLatitude } = location;
  const { categories, influencers, longitude, latitude } = filters;

  const params = new URLSearchParams({
    topLeftLongitude: topLeftLongitude.toString(),
    topLeftLatitude: topLeftLatitude.toString(),
    bottomRightLongitude: bottomRightLongitude.toString(),
    bottomRightLatitude: bottomRightLatitude.toString(),
    page: '0',
    categories: categories.join(','),
    influencers: influencers.join(','),

    longitude: longitude || '',
    latitude: latitude || '',
  });
  const response = await fetchInstance.get<PlaceList>(`/places?${params}`);
  return response.data;
};

export const useGetPlaceList = (location: LocationData, filters: FilterParams) => {
  return useSuspenseQuery({
    queryKey: ['placeList', location, filters],
    queryFn: () => getPlaceList(location, filters),
    staleTime: 1000 * 60 * 5,
  });
};
