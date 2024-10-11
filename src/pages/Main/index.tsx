import styled from 'styled-components';
import BaseLayout from '@/components/common/BaseLayout';
import MainBanner from '@/components/Main/MainBanner';

import { useGetMain } from '@/api/hooks/useGetMain';
import SearchBar from '@/components/common/SearchBar';

export default function MainPage() {
  const [{ data: bannerData }, { data: influencersData }, { data: coolVideoData }, { data: newVideoData }] =
    useGetMain();
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
