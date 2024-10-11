import { AiFillLike, AiFillDislike } from 'react-icons/ai';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { UserReviewData } from '@/types';
import { Text } from '@/components/common/typography/Text';
import { Paragraph } from '@/components/common/typography/Paragraph';

export default function UserReviewItem({ likes, comment, userNickname, place, createdDate }: UserReviewData) {
  const address = `${place.address.address1} ${place.address.address2} ${place.address.address3}`;
  return (
    <Wrapper to={`detail/${place.placeId}`}>
      <Image src={place.imgUrl} alt={userNickname} />
      <TextContainer>
        <Title>
          <Text size="m" weight="bold" variant="white">
            {userNickname}
          </Text>
          {likes ? <AiFillLike size={26} color="#fe7373" /> : <AiFillDislike size={26} color="#6F6CFF" />}
        </Title>
        <Paragraph size="xs" weight="normal" variant="white">
          {address}
        </Paragraph>
        <Title>
          <Paragraph size="s" weight="normal" variant="white">
            {comment}
          </Paragraph>
          <Text size="s" weight="normal" variant="white">
            {new Date(createdDate).toLocaleDateString()}
          </Text>
        </Title>
      </TextContainer>
    </Wrapper>
  );
}
const Wrapper = styled(Link)`
  width: 100%;
  display: flex;
  gap: 24px;
  align-items: center;
`;
const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 8px;
`;
const Image = styled.img`
  width: 90px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 30px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;
