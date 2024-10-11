import { PiHeartFill, PiHeartLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { useState } from 'react';
import { Paragraph } from '@/components/common/typography/Paragraph';

import { UserPlaceData } from '@/types';
import { usePostPlaceLike } from '@/api/hooks/usePostPlaceLike';

export default function UserPlaceItem({ placeId, placeName, imageUrl, influencer, likes }: UserPlaceData) {
  const [isLike, setIsLike] = useState(likes);
  const { mutate: postLike } = usePostPlaceLike();
  const handleClickLike = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const newLikeStatus = !isLike;
    setIsLike(newLikeStatus);
    console.log('New like status:', newLikeStatus);
    postLike(
      { placeId, likes: newLikeStatus },
      {
        onSuccess: () => {
          console.log('성공');
        },
        onError: (error) => {
          console.error('Error:', error);
        },
      },
    );
  };
  return (
    <Wrapper to={`/detail/${placeId}`}>
      <ImageContainer>
        <LikeIcon onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClickLike(e)}>
          {isLike ? <PiHeartFill color="#fe7373" size={32} /> : <PiHeartLight color="white" size={32} />}
        </LikeIcon>
        <Image src={imageUrl} alt={String(placeId)} />
      </ImageContainer>
      <Paragraph size="m" weight="bold" variant="white">
        {placeName}
      </Paragraph>
      <Paragraph size="xs" weight="normal" variant="white">
        {influencer}
      </Paragraph>
    </Wrapper>
  );
}
const Wrapper = styled(Link)`
  width: 170px;
  height: 278px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 30px;
`;
const ImageContainer = styled.div`
  width: 168px;
  height: 208px;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
`;
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 8px;
  border-radius: 6px;
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
