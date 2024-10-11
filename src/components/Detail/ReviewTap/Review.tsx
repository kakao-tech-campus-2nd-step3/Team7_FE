import styled from 'styled-components';

import ReviewItem from './ReviewItem';
import { ReviewData } from '@/types';

export default function Review({ items }: { items: ReviewData[] }) {
  return (
    <ListContainer>
      {items.map((review) => {
        return (
          <ReviewItem
            key={review.reviewId}
            likes={review.likes}
            comment={review.comment}
            userNickname={review.userNickname}
            createdDate={review.createdDate}
          />
        );
      })}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 38px;
`;
