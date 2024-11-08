import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import BaseLayout from '@/components/common/BaseLayout';
import { useGetMain } from '@/api/hooks/useGetMain';
import { usePostInfluencerLike } from '@/api/hooks/usePostInfluencerLike';
import Button from '@/components/common/Button';

const ITEMS_PER_PAGE = 10;
const MAX_PAGE_BUTTONS = 5;

export default function ChoicePage() {
  const navigate = useNavigate();
  const [{ data: influencersData }] = useGetMain();
  const { mutateAsync: postLike } = usePostInfluencerLike();
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedInfluencers = useMemo(() => {
    if (!influencersData?.influencers) return [];

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return influencersData.influencers.slice(startIndex, endIndex);
  }, [influencersData?.influencers, currentPage]);

  const totalPages = useMemo(() => {
    if (!influencersData || !influencersData.influencers) {
      return 0;
    }
    return Math.ceil(influencersData.influencers.length / ITEMS_PER_PAGE);
  }, [influencersData?.influencers]);

  const pageNumbers = useMemo(() => {
    if (totalPages <= MAX_PAGE_BUTTONS) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(currentPage - Math.floor(MAX_PAGE_BUTTONS / 2), 1);
    let end = start + MAX_PAGE_BUTTONS - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - MAX_PAGE_BUTTONS + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

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
          items={paginatedInfluencers}
          showMoreButton={false}
          isChoice
        />
        {totalPages > 1 && (
          <PaginationContainer>
            <ArrowButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <IoChevronBack size={20} />
            </ArrowButton>
            {pageNumbers.map((pageNum) => (
              <PageNumber key={pageNum} onClick={() => handlePageChange(pageNum)} active={pageNum === currentPage}>
                {pageNum}
              </PageNumber>
            ))}
            <ArrowButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              <IoChevronForward size={20} />
            </ArrowButton>
          </PaginationContainer>
        )}
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px 0;
`;

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  background: transparent;
  color: white;
  box-shadow: none;
  border: none;

  &:hover:not(:disabled) {
    background: #c8c8c8;
    color: black;
  }

  svg {
    display: block;
  }
`;

const PageNumber = styled.button<{ active: boolean }>`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: ${(props) => (props.active ? 'black' : 'white')};
  cursor: pointer;

  ${(props) =>
    props.active &&
    `
    background: #c8c8c8;
    border: 1px solid #000;
  `}

  &:hover {
    background: ${(props) => (props.active ? '#c8c8c8' : 'grey')};
  }
`;
