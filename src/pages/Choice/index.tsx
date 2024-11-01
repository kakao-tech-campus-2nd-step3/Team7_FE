import styled from 'styled-components';
import BaseLayout from '@/components/common/BaseLayout';
import { useGetMain } from '@/api/hooks/useGetMain';
import Button from '@/components/common/Button';

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
      <ButtonWrapper>
        <Button variant="white" style={{ fontWeight: 'bold', width: '170px', height: '46px', fontSize: '18px' }}>
          건너뛰기
        </Button>
        <Button variant="mint" style={{ fontWeight: 'bold', width: '170px', height: '46px', fontSize: '18px' }}>
          시작하기
        </Button>
      </ButtonWrapper>
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
  margin-bottom: 60px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 960px;
  margin-bottom: 30px;
`;
