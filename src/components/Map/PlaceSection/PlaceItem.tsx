import { FaHeart } from 'react-icons/fa';
import styled from 'styled-components';
import { Text } from '@/components/common/typography/Text';
import { PlaceInfo } from '@/types';

interface PlaceItemProps extends PlaceInfo {
  onClick: () => void;
}
const getFullAddress = (addr: PlaceInfo['address']) => {
  return [addr.address1, addr.address2, addr.address3].filter(Boolean).join(' ');
};

export default function PlaceItem({ placeId, placeName, address, influencerName, likes, onClick }: PlaceItemProps) {
  return (
    <PlaceCard key={placeId} onClick={onClick}>
      <PlaceImage src="https://via.placeholder.com/100" alt={placeName} />
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
        <HeartIcon $isLiked={likes} />
      </CardContent>
    </PlaceCard>
  );
}

const PlaceCard = styled.div`
  width: 520px;
  height: 160px;
  position: relative;
  display: flex;
`;

const PlaceImage = styled.img`
  position: absolute;
  width: 120px;
  height: 120px;
  left: 10px;
  top: 20px;
  border-radius: 30px;
  object-fit: cover;
`;

const CardContent = styled.div`
  position: absolute;
  width: 350px;
  height: 120px;
  left: 160px;
  top: 20px;
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
  width: 32px;
  height: 30px;
  left: 314px;
  top: 4px;
  color: ${(props) => (props.$isLiked ? '#fe7373' : '#9ca3af')};
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ef4444;
  }
`;
