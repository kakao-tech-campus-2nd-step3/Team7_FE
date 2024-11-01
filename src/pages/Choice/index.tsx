import styled from 'styled-components';
import BaseLayout from '@/components/common/BaseLayout';
import { useGetMain } from '@/api/hooks/useGetMain';

export default function ChoicePage() {
  const [{ data: influencersData }] = useGetMain();

  return (
    <PageContainer>
      <LayoutWrapper>
        <BaseLayout
          type="influencer"
          prevSubText="관심 있는 "
          mainText="인플루언서"
          SubText="를 선택하세요!"
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
