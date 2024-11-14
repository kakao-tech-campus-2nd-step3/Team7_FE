import { styled } from 'styled-components';
import { useRef } from 'react';
import { Paragraph } from '@/components/common/typography/Paragraph';
import { useGetUserInfluencer } from '@/api/hooks/useGetUserInfluencer';
import { useGetUserPlace } from '@/api/hooks/useGetUserPlace';
import { Text } from '@/components/common/typography/Text';
import { useGetUserReview } from '@/api/hooks/useGetUserReview';
import MyReview from '@/components/My/UserReview';
import InfiniteBaseLayout from '@/components/My/infiniteBaseLayout';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

export default function MyPage() {
  const influencerRef = useRef<HTMLDivElement>(null);
  const {
    data: influencers,
    fetchNextPage: influencerFetchNextPage,
    hasNextPage: influencerHasNextPage,
    isFetchingNextPage: influencerIsFetchingNextPage,
  } = useGetUserInfluencer(10);
  const influencerLoadMoreRef = useInfiniteScroll({
    fetchNextPage: influencerFetchNextPage,
    hasNextPage: influencerHasNextPage,
    isFetchingNextPage: influencerIsFetchingNextPage,
  });

  const placeRef = useRef<HTMLDivElement>(null);
  const {
    data: places,
    fetchNextPage: placeFetchNextPage,
    hasNextPage: placeHasNextPage,
    isFetchingNextPage: placeIsFetchingNextPage,
  } = useGetUserPlace(10);
  const placeLoadMoreRef = useInfiniteScroll({
    fetchNextPage: placeFetchNextPage,
    hasNextPage: placeHasNextPage,
    isFetchingNextPage: placeIsFetchingNextPage,
  });

  const reviewRef = useRef<HTMLDivElement>(null);
  const { data: reviews, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUserReview(10);
  const reviewLoadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });
  const userNickname = localStorage.getItem('nickname');
  return (
    <Wrapper>
      <TitleWrapper>
        <Text size="l" weight="bold" variant="white">
          <Text size="xl" weight="bold" variant="mint">
            {userNickname}
          </Text>
          님, 안녕하세요!
        </Text>
        <Paragraph size="m" weight="bold" variant="white">
          인플레이스를 이용해주셔서 감사합니다.
        </Paragraph>
      </TitleWrapper>
      <InfiniteBaseLayout
        type="influencer"
        mainText=""
        SubText="나의 인플루언서"
        items={influencers.pages.flatMap((page) => page.content)}
        loadMoreRef={influencerLoadMoreRef}
        sectionRef={influencerRef}
        hasNextPage={influencerHasNextPage}
        fetchNextPage={influencerFetchNextPage}
        isFetchingNextPage={influencerIsFetchingNextPage}
      />
      <InfiniteBaseLayout
        type="place"
        mainText=""
        SubText="나의 관심 장소"
        items={places.pages.flatMap((page) => page.content)}
        loadMoreRef={placeLoadMoreRef}
        sectionRef={placeRef}
        hasNextPage={placeHasNextPage}
        fetchNextPage={placeFetchNextPage}
        isFetchingNextPage={placeIsFetchingNextPage}
      />
      <MyReview
        mainText="나의 리뷰"
        items={reviews.pages.flatMap((page) => page.content)}
        loadMoreRef={reviewLoadMoreRef}
        sectionRef={reviewRef}
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
