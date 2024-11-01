import styled from 'styled-components';
import { Text } from '@/components/common/typography/Text';
import SearchBar from '@/components/common/SearchBar';
import BaseLayout from '@/components/common/BaseLayout';
import { useGetMain } from '@/api/hooks/useGetMain';

export default function InfluencerPage() {
  const [{ data: influencersData }] = useGetMain();

  return (
    <PageContainer>
      <Text size="l" weight="bold" variant="white">
        인플루언서
      </Text>
      <SearchBar />
      <LayoutWrapper>
        <BaseLayout
          type="influencer"
          mainText=""
          SubText=""
          items={influencersData.influencers}
          showMoreButton={false}
        />
      </LayoutWrapper>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  padding: 6px 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const LayoutWrapper = styled.div`
  margin-bottom: 80px;
`;
