import { FaHeart } from 'react-icons/fa';
import styled from 'styled-components';
import { Text } from '@/components/common/typography/Text';
import { PlaceData } from '@/types';

interface PlaceItemProps extends PlaceData {
  onClick: () => void;
}
const getFullAddress = (addr: PlaceData['address']) => {
  return [addr.address1, addr.address2, addr.address3].filter(Boolean).join(' ');
};

export default function PlaceItem({
  placeId,
  placeName,
  address,
  influencerName,
  likes,
  menuImgUrl,
  onClick,
}: PlaceItemProps) {
  return (
    <PlaceCard key={placeId} onClick={onClick}>
      <PlaceImage src={menuImgUrl} alt={placeName} />
      <CardContent>
        <PlaceDetails>
          <Text size="l" weight="bold" variant="white">
            {placeName}
          </Text>
          <Address>
            <Text size="s" weight="normal" variant="white">
              {getFullAddress(address)}
            </Text>
          </Address>
          <InfluencerName>
            <Text size="s" weight="normal" variant="white">
              {influencerName}
            </Text>
          </InfluencerName>
        </PlaceDetails>
        <HeartIcon $isLiked={likes > 0} />
      </CardContent>
    </PlaceCard>
  );
}

const PlaceCard = styled.div`
  width: 460px;
  height: 160px;
  position: relative;
  display: flex;
  box-sizing: border-box;
`;

const PlaceImage = styled.img`
  position: absolute;
  width: 100px;
  height: 100px;
  left: 10px;
  top: 30px;
  border-radius: 30px;
  object-fit: cover;
`;

const CardContent = styled.div`
  position: absolute;
  width: 320px;
  height: 100px;
  left: 130px;
  top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlaceDetails = styled.div`
  position: relative;
  width: 290px;
  height: 102px;
`;

const Address = styled.div`
  position: absolute;
  top: 30px;
`;

const InfluencerName = styled.div`
  position: absolute;
  top: 70px;
`;

const HeartIcon = styled(FaHeart)<{ $isLiked: boolean }>`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 10px;
  top: 10px;
  color: ${(props) => (props.$isLiked ? '#fe7373' : '#9ca3af')};
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ef4444;
  }
`;
