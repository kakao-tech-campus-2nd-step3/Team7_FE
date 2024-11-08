import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { Text } from '@/components/common/typography/Text';
import SearchBar from '@/components/common/SearchBar';
import BaseLayout from '@/components/common/BaseLayout';
import { useGetMain } from '@/api/hooks/useGetMain';

const ITEMS_PER_PAGE = 10;
const MAX_PAGE_BUTTONS = 5;

export default function InfluencerPage() {
  const [{ data: influencersData }] = useGetMain();
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

  return (
    <PageContainer>
      <Text size="l" weight="bold" variant="white">
        인플루언서
      </Text>
      <SearchBar data={[]} />
      <LayoutWrapper>
        <BaseLayout type="influencer" mainText="" SubText="" items={paginatedInfluencers} showMoreButton={false} />
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
