import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';
import { Paragraph } from '@/components/common/typography/Paragraph';
import { useGetUserInfluencer } from '@/api/hooks/useGetUserInfluencer';
import BaseLayout from '@/components/common/BaseLayout';
import { useGetUserPlace } from '@/api/hooks/useGetUserPlace';
import { Text } from '@/components/common/typography/Text';
import { useGetUserReview } from '@/api/hooks/useGetUserReview';
import MyReview from '@/components/My/UserReview';
import { useGetUserInfo } from '@/api/hooks/useGetUserInfo';

export default function MyPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { data: nickname } = useGetUserInfo();
  const { data: items } = useGetUserInfluencer();
  const { data: places } = useGetUserPlace();
  const { data: reviews, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUserReview(10);
  const { ref: loadMoreRef, inView } = useInView({
    root: sectionRef.current,
    rootMargin: '0px',
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Wrapper>
      <TitleWrapper>
        <Text size="l" weight="bold" variant="white">
          <Text size="xl" weight="bold" variant="mint">
            {nickname.nickname}
          </Text>
          님, 안녕하세요!
        </Text>
        <Paragraph size="m" weight="bold" variant="white">
          인플레이스를 이용해주셔서 감사합니다.
        </Paragraph>
      </TitleWrapper>
      <BaseLayout type="influencer" mainText="" SubText="나의 인플루언서" items={items.influencers} />
      <BaseLayout type="place" mainText="" SubText="나의 관심 장소" items={places.places} />
      <MyReview
        mainText="나의 리뷰"
        items={reviews.pages.flatMap((page) => page.content)}
        loadMoreRef={loadMoreRef}
        sectionRef={sectionRef}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 30px 0px 60px;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
