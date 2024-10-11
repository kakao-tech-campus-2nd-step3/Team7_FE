import { HttpResponse, http } from 'msw';
import { BASE_URL } from '@/api/instance';
import { PlaceList, PlaceInfo } from '@/types';

const dummyPlaces: PlaceInfo[] = [
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
    likes: true,
    facilityInfo: {
      wifi: 'Y',
      pet: 'N',
      parking: 'Y',
      forDisabled: 'N',
      nursery: 'Y',
      smokingRoom: 'N',
    },
    menuInfos: {
      menuImgUrls: ['https://via.placeholder.com/500'],
      menuList: [
        {
          price: '14000',
          recommend: false,
          menu: '국내산 돼지 안심을 료코만의',
        },
      ],
      timeExp: new Date('2024-10-01T12:00:00Z'),
    },
    openHour: {
      periodList: [
        {
          timeName: '영업시간',
          timeSE: '10:00 - 22:00',
          dayOfWeek: '월',
        },
        {
          timeName: '영업시간',
          timeSE: '10:00 - 22:00',
          dayOfWeek: '화',
        },
        {
          timeName: '영업시간',
          timeSE: '10:00 - 22:00',
          dayOfWeek: '수',
        },
        {
          timeName: '영업시간',
          timeSE: '10:00 - 22:00',
          dayOfWeek: '목',
        },
        {
          timeName: '영업시간',
          timeSE: '10:00 - 22:00',
          dayOfWeek: '금',
        },
      ],
      offdayList: [
        {
          holidayName: '공휴일',
          weekAndDay: '토',
          temporaryHolidays: false,
        },
      ],
    },
    placeLikes: {
      like: 240,
      dislike: 100,
    },
    videoUrl: 'https://youtube.com/watch?v=abcdefg',
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
    likes: true,
    facilityInfo: {
      wifi: 'Y',
      pet: 'N',
      parking: 'Y',
      forDisabled: 'Y',
      nursery: 'N',
      smokingRoom: 'N',
    },
    menuInfos: {
      menuImgUrls: ['https://example.com/menu1.jpg'],
      menuList: [
        {
          price: '15000',
          recommend: true,
          menu: '특선 돈가스',
        },
      ],
      timeExp: new Date('2023-12-31'),
    },
    openHour: {
      periodList: [
        {
          timeName: '평일',
          timeSE: '11:00 - 21:00',
          dayOfWeek: '월,화,수,목,금',
        },
        {
          timeName: '주말',
          timeSE: '11:00 - 22:00',
          dayOfWeek: '토,일',
        },
      ],
      offdayList: [
        {
          holidayName: '정기휴일',
          weekAndDay: '매주 월요일',
          temporaryHolidays: false,
        },
      ],
    },
    placeLikes: {
      like: 120,
      dislike: 5,
    },
    videoUrl: 'https://youtube.com/watch?v=abcdefg',
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
    likes: true,
    facilityInfo: {
      wifi: 'Y',
      pet: 'N',
      parking: 'Y',
      forDisabled: 'Y',
      nursery: 'N',
      smokingRoom: 'N',
    },
    menuInfos: {
      menuImgUrls: ['https://example.com/menu1.jpg'],
      menuList: [
        {
          price: '15000',
          recommend: true,
          menu: '특선 돈가스',
        },
      ],
      timeExp: new Date('2023-12-31'),
    },
    openHour: {
      periodList: [
        {
          timeName: '평일',
          timeSE: '11:00 - 21:00',
          dayOfWeek: '월,화,수,목,금',
        },
        {
          timeName: '주말',
          timeSE: '11:00 - 22:00',
          dayOfWeek: '토,일',
        },
      ],
      offdayList: [
        {
          holidayName: '정기휴일',
          weekAndDay: '매주 월요일',
          temporaryHolidays: false,
        },
      ],
    },
    placeLikes: {
      like: 120,
      dislike: 5,
    },
    videoUrl: 'https://youtube.com/watch?v=abcdefg',
  },
];

export const mapHandlers = [
  http.get(`${BASE_URL}/places`, () => {
    const response: PlaceList = {
      places: dummyPlaces,
    };

    return HttpResponse.json(response);
  }),
];

export default mapHandlers;
