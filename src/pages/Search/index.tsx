import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Paragraph } from '@/components/common/typography/Paragraph';
import { Text } from '@/components/common/typography/Text';
import SearchBar from '@/components/common/SearchBar';

export default function SearchPage() {
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('query');
  const searchData = ['apple', 'banana', 'coding', 'javascript', '원티드', '프리온보딩', '프론트엔드'];

  /* todo - api 개발되면 검색결과 호출 추가 */
  return (
    <Wrapper>
      <SearchBar placeholder="인플루언서, 장소를 검색해주세요!" data={searchData} />
      <Paragraph weight="normal" size="m" variant="white">
        <Text weight="bold" size="m" variant="mint">
          {`${query} `}
        </Text>
        검색 결과
      </Paragraph>
      {/* todo - 검색 결과 렌더링 */}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
