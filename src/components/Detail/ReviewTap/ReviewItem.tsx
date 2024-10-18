import { AiFillLike, AiFillDislike } from 'react-icons/ai';

import styled from 'styled-components';

import { Paragraph } from '@/components/common/typography/Paragraph';
import { Text } from '@/components/common/typography/Text';

import { ReviewData } from '@/types';

export default function ReviewItem({ likes, comment, userNickname, createdDate }: ReviewData) {
  return (
    <Wrapper>
      <Title>
        <Name>
          <Text size="xs" weight="bold" variant="white">
            {userNickname}
          </Text>
          {likes ? <AiFillLike size={22} color="#fe7373" /> : <AiFillDislike size={22} color="#6F6CFF" />}
        </Name>
        <Text size="xs" weight="normal" variant="white">
          {new Date(createdDate).toLocaleDateString()}
        </Text>
      </Title>
      <Paragraph size="xs" weight="normal" variant="white">
        {comment}
      </Paragraph>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: end;
  line-height: 150%;
  gap: 2px;

  svg {
    margin-left: 40px;
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Name = styled.div``;
