import styled from 'styled-components';
import BaseLayout from '@/components/common/BaseLayout';
import MainBanner from '@/components/Main/MainBanner';

import { useGetMain } from '@/api/hooks/useGetMain';
import SearchBar from '@/components/common/SearchBar';

const bannerData = {
  banners: [
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
  ],
};
export default function MainPage() {
  const [{ data: influencersData }, { data: coolVideoData }, { data: newVideoData }] = useGetMain();
  return (
    <Wrapper>
      <SearchBar />
      <MainBanner items={bannerData.banners} />
      <BaseLayout
        type="influencer"
        mainText="인플루언서"
        SubText=" 가 방문한 장소를 찾아볼까요?"
        items={influencersData.influencers}
      />
      <BaseLayout type="spot" prevSubText="지금 " mainText="쿨" SubText=" 한 그곳!" items={coolVideoData} />
      <BaseLayout type="spot" mainText="새로" SubText=" 등록된 그곳!" items={newVideoData} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
