import { HttpResponse, http } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getPlaceInfoPath } from '@/api/hooks/useGetPlaceInfo';
import { getReviewPath } from '@/api/hooks/useGetReview';

export const detailHandlers = [
  http.get(`${BASE_URL}${getPlaceInfoPath('1')}`, () => {
    return HttpResponse.json({
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
        menuImgUrls: [
          'https://via.placeholder.com/500',
          'https://via.placeholder.com/600',
          'https://via.placeholder.com/700',
        ],
        menuList: [
          {
            price: '14000',
            recommend: false,
            menu: '국내산 돼지 안심을 료코만의',
          },
          {
            price: '3000',
            recommend: false,
            menu: '리조또',
          },
          {
            price: '14000',
            recommend: false,
            menu: '국내산 돼지 안심을 료코만의 방식으로 숙성 및 조리하여 육즙과 부드러움의 특징을 살린 메뉴',
          },
          {
            price: '3020',
            recommend: false,
            menu: '리또',
          },
        ],
        timeExp: new Date('2024-10-01T12:00:00Z'),
      },
      openHour: {
        periodName: '영업시간',
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
      videoUrl: 'https://youtu.be/qbqquv_8wM0?si=j7LiU5DSfTVpKa1I',
    });
  }),
  http.get(`${BASE_URL}${getReviewPath('1')}`, () => {
    return HttpResponse.json([
      {
        reviewId: 1,
        likes: true,
        comment: '정말 좋았어요! 다음에 또 오고 싶습니다',
        userNickname: '사용자1',
        createdDate: new Date('2024-10-01T12:00:00Z'),
      },
      {
        reviewId: 2,
        likes: false,
        comment: '별로였어요. 개선이 필요합니다.',
        userNickname: '사용자2',
        createdDate: new Date('2024-10-02T15:30:00Z'),
      },
      {
        reviewId: 3,
        likes: true,
        comment: '맛있고 분위기도 좋았습니다',
        userNickname: '사용자3',
        createdDate: new Date('2024-10-03T09:15:00Z'),
      },
      {
        reviewId: 4,
        likes: false,
        comment: '서비스가 아쉬웠습니다',
        userNickname: '사용자4',
        createdDate: new Date('2024-10-03T11:45:00Z'),
      },
    ]);
  }),
];
export default detailHandlers;
