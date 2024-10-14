import { HttpResponse, http } from 'msw';
import { BASE_URL } from '@/api/instance';
import { PlaceData } from '@/types';

const dummyPlaces: PlaceData[] = [
  {
    placeId: 1,
    placeName: '료코',
    address: {
      address1: '대구',
      address2: '북구',
      address3: '대학로',
    },
    category: '맛집',
    influencerName: '성시경',
    longitude: '35.123',
    latitude: '135.11',
    likes: 240,
    menuImgUrl: 'https://via.placeholder.com/500',
  },
  {
    placeId: 2,
    placeName: '긴자료코 홍대본점',
    address: {
      address1: '서울특별시',
      address2: '마포구',
      address3: '서교동',
    },
    category: '맛집',
    influencerName: '풍자',
    longitude: '126.9314925',
    latitude: '37.5666478',
    likes: 120,
    menuImgUrl: 'https://example.com/menu1.jpg',
  },
  {
    placeId: 3,
    placeName: '맘스터치 대구대현점',
    address: {
      address1: '대구광역시',
      address2: '북구',
      address3: '대현동 119-9',
    },
    category: '맛집',
    influencerName: '풍자',
    longitude: '128.6101069',
    latitude: '35.8857457',
    likes: 120,
    menuImgUrl: 'https://example.com/menu1.jpg',
  },
];

export const mapHandlers = [
  http.get(`${BASE_URL}/places`, () => {
    return HttpResponse.json({ places: dummyPlaces });
  }),
];

export default mapHandlers;
