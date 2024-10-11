import { HttpResponse, http } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getUserInfoPath } from '@/api/hooks/useGetUserInfo';
import { getUserInfluencerPath } from '@/api/hooks/useGetUserInfluencer';
import { getUserPlacePath } from '@/api/hooks/useGetUserPlace';
import { getUserReviewPath } from '@/api/hooks/useGetUserReview';

export const myHandlers = [
  http.get(`${BASE_URL}${getUserInfoPath()}`, () => {
    return HttpResponse.json({
      nickname: '랄라스윗칩',
    });
  }),
  http.get(`${BASE_URL}${getUserInfluencerPath()}`, () => {
    return HttpResponse.json({
      influencers: [
        {
          influencerId: 1,
          influencerName: '이하늬',
          influencerImgUrl: 'https://via.placeholder.com/100',
          influencerJob: '모델',
          likes: true,
        },
        {
          influencerId: 2,
          influencerName: '박서준',
          influencerImgUrl: 'https://via.placeholder.com/100',
          influencerJob: '배우',
          likes: true,
        },
        {
          influencerId: 3,
          influencerName: '아이유',
          influencerImgUrl: 'https://via.placeholder.com/100',
          influencerJob: '가수',
          likes: true,
        },
        {
          influencerId: 4,
          influencerName: '이영자',
          influencerImgUrl: 'https://via.placeholder.com/100',
          influencerJob: '방송인',
          likes: true,
        },
      ],
    });
  }),
  http.get(`${BASE_URL}${getUserPlacePath()}`, () => {
    return HttpResponse.json({
      places: [
        {
          placeId: 1,
          placeName: '료코',
          imageUrl: 'https://via.placeholder.com/100',
          influencer: '성시경',
        },
        {
          placeId: 2,
          placeName: '이선장네',
          imageUrl: 'https://via.placeholder.com/100',
          influencer: '박서준',
        },
        {
          placeId: 3,
          placeName: '풍자또가',
          imageUrl: 'https://via.placeholder.com/100',
          influencer: '풍자',
        },
      ],
    });
  }),
  http.get(`${BASE_URL}${getUserReviewPath()}`, () => {
    return HttpResponse.json({
      reviews: [
        {
          reviewId: 1,
          userNickname: '랄라스윗칩',
          place: {
            placeId: '1',
            imgUrl: 'https://via.placeholder.com/100',
            address: {
              address1: '대구광역시',
              address2: '북구',
              address3: '대현로',
            },
          },
          likes: true,
          comment: '료무라이스 맛있어요~~ 다시 가고 시퍼요',
          createdDate: new Date('2024-10-01T12:00:00Z'),
        },
        {
          reviewId: 2,
          userNickname: '선장님',
          place: {
            placeId: '2',
            imgUrl: 'https://via.placeholder.com/100',
            address: {
              address1: '경상북도',
              address2: '경주시',
              address3: '황리단길',
            },
          },
          likes: false,
          comment: '느끼하고 양 적어요 우우 ㅜㅜ',
          createdDate: new Date('2024-10-02T12:00:00Z'),
        },
      ],
    });
  }),
];
export default myHandlers;
