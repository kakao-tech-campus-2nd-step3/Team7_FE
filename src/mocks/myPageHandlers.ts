import { rest } from 'msw';
import { BASE_URL } from '@/api/instance';
import { getUserInfoPath } from '@/api/hooks/useGetUserInfo';
import { getUserInfluencerPath } from '@/api/hooks/useGetUserInfluencer';
import { getUserPlacePath } from '@/api/hooks/useGetUserPlace';
import { getUserReviewPath } from '@/api/hooks/useGetUserReview';

const mockReviews = [
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
  {
    reviewId: 3,
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
  {
    reviewId: 4,
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
  {
    reviewId: 5,
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
  {
    reviewId: 6,
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
  {
    reviewId: 7,
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
  {
    reviewId: 8,
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
  {
    reviewId: 9,
    userNickname: '9요',
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
  {
    reviewId: 10,
    userNickname: '10이여',
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
  {
    reviewId: 11,
    userNickname: '11이야',
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
];
export const myHandlers = [
  rest.get(`${BASE_URL}${getUserInfoPath()}`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        nickname: '랄라스윗칩',
      }),
    );
  }),
  rest.get(`${BASE_URL}${getUserInfluencerPath()}`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
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
      }),
    );
  }),
  rest.get(`${BASE_URL}${getUserPlacePath()}`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
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
            influencer: '임영웅',
          },
          {
            placeId: 3,
            placeName: '풍자또가',
            imageUrl: 'https://via.placeholder.com/100',
            influencer: '풍자',
          },
        ],
      }),
    );
  }),
  rest.get(`${BASE_URL}${getUserReviewPath()}`, (req, res, ctx) => {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') ?? '0', 10);
    const size = parseInt(url.searchParams.get('size') ?? '10', 10);

    const totalElements = mockReviews.length;
    const totalPages = Math.ceil(totalElements / size);
    const startIndex = page * size;
    const endIndex = Math.min(startIndex + size, totalElements);
    const paginatedContent = mockReviews.slice(startIndex, endIndex);

    return res(
      ctx.status(200),
      ctx.json({
        totalPages,
        totalElements,
        size,
        content: paginatedContent,
        number: page,
        sort: {
          empty: true,
          sorted: true,
          unsorted: true,
        },
        numberOfElements: paginatedContent.length,
        pageable: {
          offset: page * size,
          sort: {
            empty: true,
            sorted: true,
            unsorted: true,
          },
          paged: true,
          pageNumber: page,
          pageSize: size,
          unpaged: false,
        },
        first: page === 0,
        last: page === totalPages - 1,
        empty: paginatedContent.length === 0,
      }),
    );
  }),
];
export default myHandlers;
