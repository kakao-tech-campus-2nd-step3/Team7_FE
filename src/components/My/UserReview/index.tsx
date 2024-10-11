import styled from 'styled-components';

import { UserReviewData } from '@/types';
import { Paragraph } from '@/components/common/typography/Paragraph';
import UserReviewList from './UserReviewList';

type Props = {
  mainText: string;
  items: UserReviewData[];
};

export default function MyReview({ mainText, items }: Props) {
  return (
    <Container>
      <TitleContainer>
        <Paragraph size="m" weight="bold">
          {mainText}
        </Paragraph>
      </TitleContainer>
      <UserReviewList items={items as UserReviewData[]} />
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  color: white;
`;
