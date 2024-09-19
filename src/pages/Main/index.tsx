import styled from 'styled-components';

import InfluencerSection from '@/components/features/Main/Influencer';
import MainBanner from '@/components/features/Main/MainBanner.tsx';

import { BannerData, InfluencerData } from '@/types';

const bannerDummyData: BannerData[] = [
  {
    bannerId: 1,
    placeId: '1',
    description: '9.9 - 9.20',
    bannerImg: 'https://via.placeholder.com/1000',
    title: '도구리 팝업스토어',
  },
  {
    bannerId: 2,
    placeId: '2',
    description: '9.9 - 9.20',
    bannerImg: 'https://via.placeholder.com/1000',
    title: '숲속 캠핑',
  },
  {
    bannerId: 3,
    placeId: '3',
    description: '9.9 - 9.20',
    bannerImg: 'https://via.placeholder.com/1000',
    title: '도시 탐방',
  },
  {
    bannerId: 4,
    placeId: '4',
    description: '9.9 - 9.20',
    bannerImg: 'https://via.placeholder.com/1000',
    title: '산악 트레킹',
  },
  {
    bannerId: 5,
    placeId: '5',
    description: '9.9 - 9.20',
    bannerImg: 'https://via.placeholder.com/1000',
    title: '바다에서의 하루',
  },
];
const influencersDummyData: InfluencerData[] = [
  {
    influencerId: 1,
    influencerName: '이하늬',
    influencerImgUrl: ' https://via.placeholder.com/100',
    influencerJob: '모델',
    likes: true,
  },
  {
    influencerId: 2,
    influencerName: '박서준',
    influencerImgUrl: ' https://via.placeholder.com/100',
    influencerJob: '배우',
    likes: false,
  },
  {
    influencerId: 3,
    influencerName: '아이유',
    influencerImgUrl: ' https://via.placeholder.com/100',
    influencerJob: '가수',
    likes: true,
  },
  {
    influencerId: 4,
    influencerName: '이영자',
    influencerImgUrl: ' https://via.placeholder.com/100',
    influencerJob: '방송인',
    likes: false,
  },
  {
    influencerId: 5,
    influencerName: '정해인',
    influencerImgUrl: ' https://via.placeholder.com/100',
    influencerJob: '배우',
    likes: true,
  },
  {
    influencerId: 7,
    influencerName: '정해인',
    influencerImgUrl: ' https://via.placeholder.com/100',
    influencerJob: '배우',
    likes: true,
  },
  {
    influencerId: 8,
    influencerName: '정해인',
    influencerImgUrl: ' https://via.placeholder.com/100',
    influencerJob: '배우',
    likes: true,
  },
  {
    influencerId: 9,
    influencerName: '정해인',
    influencerImgUrl: ' https://via.placeholder.com/100',
    influencerJob: '배우',
    likes: true,
  },
];

export default function MainPage() {
  return (
    <Wrapper>
      <MainBanner items={bannerDummyData} />
      <InfluencerSection influencers={influencersDummyData} />
      {/* <FirstSpotSection />
      <SecondSpotSection /> */}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
