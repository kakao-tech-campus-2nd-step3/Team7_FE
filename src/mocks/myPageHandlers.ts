import { HttpResponse, http } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getUserInfoPath } from '@/api/hooks/useGetUserInfo';
import { getUserInfluencerPath } from '@/api/hooks/useGetUserInfluencer';
import { getUserPlacePath } from '@/api/hooks/useGetUserPlace';

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
];
export default myHandlers;
