import styled from 'styled-components';
import { Text } from '@/components/common/typography/Text';
import SearchBar from '@/components/common/SearchBar';

export default function InfluencerPage() {
  return (
    <PageContainer>
      <Text size="l" weight="bold" variant="white">
        인플루언서
      </Text>
      <SearchBar />
      <Text size="xl" weight="normal">
        componet
      </Text>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  padding: 6px 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
