import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '@/components/common/BaseLayout';
import { useGetMain } from '@/api/hooks/useGetMain';
import { usePostInfluencerLike } from '@/api/hooks/usePostInfluencerLike';
import Button from '@/components/common/Button';

export default function ChoicePage() {
  const navigate = useNavigate();
  const [{ data: influencersData }] = useGetMain();
  const { mutateAsync: postLike } = usePostInfluencerLike();

  const handleSkip = async () => {
    try {
      const updatePromises = influencersData.influencers
        .filter((influencer) => influencer.likes)
        .map((influencer) =>
          postLike({
            influencerId: influencer.influencerId,
            likes: false,
          }),
        );
      await Promise.all(updatePromises);
      navigate('/');
    } catch (error) {
      console.error('좋아요 초기화 중 오류 발생:', error);
      navigate('/');
    }
  };

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
          isChoice
        />
      </LayoutWrapper>
      <ButtonWrapper>
        <Button
          variant="white"
          style={{ fontWeight: 'bold', width: '170px', height: '46px', fontSize: '18px' }}
          onClick={handleSkip}
        >
          건너뛰기
        </Button>
        <Button
          variant="mint"
          style={{ fontWeight: 'bold', width: '170px', height: '46px', fontSize: '18px' }}
          onClick={() => navigate('/')}
        >
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
