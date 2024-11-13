import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Paragraph } from '@/components/common/typography/Paragraph';
import { Text } from '@/components/common/typography/Text';
import SearchBar from '@/components/common/SearchBar';
import BaseLayout from '@/components/common/BaseLayout';
import { useGetMain } from '@/api/hooks/useGetMain';
import { useGetLogoutVideo } from '@/api/hooks/useGetLogoutVideo';
import { useGetUserPlace } from '@/api/hooks/useGetUserPlace';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const searchData = ['apple', 'banana', 'coding', 'javascript', '원티드', '프리온보딩', '프론트엔드'];

  /* todo - api 개발되면 검색결과, searchData 호출 추가 */
  const [{ data: influencersData }] = useGetMain();
  const [{ data: coolVideoData }] = useGetLogoutVideo(true);
  const { data: places } = useGetUserPlace();

  /* todo - api 개발되면 렌더 내용 추가 */
  return (
    <Wrapper>
      <SearchBar placeholder="인플루언서, 장소를 검색해주세요!" data={searchData} />
      <Paragraph weight="normal" size="m" variant="white">
        <Text weight="bold" size="m" variant="mint">
          {`${query} `}
        </Text>
        검색 결과
      </Paragraph>
      <SplitLine />
      <BaseLayout type="influencer" mainText="" SubText="인플루언서" items={influencersData.content} />
      <SplitLine />
      <BaseLayout type="spot" mainText="" SubText="바로 그곳" items={coolVideoData || []} />
      <SplitLine />
      <BaseLayout type="place" mainText="" SubText="관련 장소" items={places.places} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
const SplitLine = styled.div`
  border-bottom: 1px solid #595959;
`;
