import styled from 'styled-components';
import { UserReviewData } from '@/types';
import UserReviewItem from './UserReviewItem';

export default function UserReviewList({ items }: { items: UserReviewData[] }) {
  return (
    <ListContainer>
      {items.map((review) => {
        return (
          <UserReviewItem
            key={review.reviewId}
            reviewId={review.reviewId}
            userNickname={review.userNickname}
            place={review.place}
            likes={review.likes}
            comment={review.comment}
            createdDate={review.createdDate}
          />
        );
      })}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;
