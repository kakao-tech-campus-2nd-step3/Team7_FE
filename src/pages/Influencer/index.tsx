import { useState } from 'react';
import styled from 'styled-components';
import { useGetAllInfluencers } from '@/api/hooks/useGetAllInfluencers';
import { Text } from '@/components/common/typography/Text';
import SearchBar from '@/components/common/SearchBar';
import BaseLayout from '@/components/common/BaseLayout';
import Pagination from '@/components/common/Pagination';

export default function InfluencerPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: pageableData } = useGetAllInfluencers({
    page: currentPage - 1,
    size: 10,
  });

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
        <BaseLayout type="influencer" mainText="" SubText="" items={pageableData?.content} showMoreButton={false} />
      </LayoutWrapper>
      <Pagination
        currentPage={currentPage}
        totalPages={pageableData.totalPages || 0}
        totalItems={pageableData?.totalElements}
        onPageChange={handlePageChange}
        itemsPerPage={pageableData.pageable.pageSize}
      />
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
