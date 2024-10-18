import styled from 'styled-components';
import { PiHeartFill, PiHeartLight } from 'react-icons/pi';
import { useCallback, useState } from 'react';
import { Text } from '@/components/common/typography/Text';
import { PlaceData } from '@/types';
import { usePostPlaceLike } from '@/api/hooks/usePostPlaceLike';

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
  const [isLike, setIsLike] = useState(likes);
  const { mutate: postLike } = usePostPlaceLike();
  const handleClickLike = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.preventDefault();
      const newLikeStatus = !isLike;
      console.log('New like status:', newLikeStatus);
      postLike(
        { placeId, likes: newLikeStatus },
        {
          onSuccess: () => {
            console.log('성공');
            setIsLike(newLikeStatus);
          },
          onError: (error) => {
            console.error('Error:', error);
          },
        },
      );
    },
    [isLike, placeId, postLike],
  );
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
        <LikeIcon onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClickLike(e)}>
          {isLike ? <PiHeartFill color="#fe7373" size={32} /> : <PiHeartLight color="white" size={32} />}
        </LikeIcon>
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

const LikeIcon = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 10px;
  top: 12px;
  z-index: 100;
  cursor: pointer;
`;
