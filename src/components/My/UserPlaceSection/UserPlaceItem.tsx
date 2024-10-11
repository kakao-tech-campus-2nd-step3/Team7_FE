import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { Paragraph } from '@/components/common/typography/Paragraph';

import { UserPlaceData } from '@/types';

export default function UserPlaceItem({ placeId, placeName, imageUrl, influencer }: UserPlaceData) {
  return (
    <Wrapper to={`/detail/${placeId}`}>
      <Image src={imageUrl} alt={String(placeId)} />
      <Paragraph size="m" weight="bold" variant="white">
        {placeName}
      </Paragraph>
      <Paragraph size="xs" weight="normal" variant="white">
        <FaMapMarkerAlt size={20} color="#55EBFF" />
        {influencer}
      </Paragraph>
    </Wrapper>
  );
}
const Wrapper = styled(Link)`
  width: 340px;
  height: 304px;
  display: flex;
  flex-direction: column;
  align-content: end;
  line-height: 30px;

  svg {
    margin-right: 2px;
  }
`;

const Image = styled.img`
  width: 340px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 6px;
`;
