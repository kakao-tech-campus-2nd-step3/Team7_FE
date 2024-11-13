import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '@/components/common/BaseLayout';
import { useGetAllInfluencers } from '@/api/hooks/useGetAllInfluencers';
import { usePostMultipleInfluencerLike } from '@/api/hooks/usePostMultipleInfluencerLike';
import Button from '@/components/common/Button';
import Pagination from '@/components/common/Pagination';

export default function ChoicePage() {
  const navigate = useNavigate();
  const { mutateAsync: postMultipleLikes } = usePostMultipleInfluencerLike();
  const [selectedInfluencers, setSelectedInfluencers] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const { data: PageableData } = useGetAllInfluencers({
    page: currentPage - 1,
    size: 10,
  });

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const handleSkip = () => {
    navigate('/');
  };

  const handleStart = async () => {
    try {
      if (selectedInfluencers.size > 0) {
        await postMultipleLikes({
          influencerIds: Array.from(selectedInfluencers),
          likes: true,
        });
      }
      navigate('/');
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
      navigate('/');
    }
  };

  const handleToggleLike = (influencerId: number, isLiked: boolean) => {
    setSelectedInfluencers((prev) => {
      const newSet = new Set(prev);
      if (isLiked) {
        newSet.add(influencerId);
      } else {
        newSet.delete(influencerId);
      }
      return newSet;
    });
  };

  return (
    <PageContainer>
      <LayoutWrapper>
        <BaseLayout
          type="influencer"
          prevSubText="관심 있는 "
          mainText="인플루언서"
          SubText="를 선택하세요!"
          items={PageableData?.content || []}
          showMoreButton={false}
          isChoice
          onToggleLike={handleToggleLike}
          selectedInfluencers={selectedInfluencers}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={PageableData.totalPages}
          totalItems={PageableData?.totalElements}
          onPageChange={handlePageChange}
          itemsPerPage={PageableData.pageable.pageSize}
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
          onClick={handleStart}
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
