import { Link, useLocation } from 'react-router-dom';
import { PiHeartFill, PiHeartLight } from 'react-icons/pi';

import styled from 'styled-components';

import { MdLocationOn } from 'react-icons/md';
import { useCallback, useState } from 'react';
import { Paragraph } from '@/components/common/typography/Paragraph';
import backCard from '@/assets/images/back-card.png';
import { InfluencerData } from '@/types';
import { usePostInfluencerLike } from '@/api/hooks/usePostInfluencerLike';
import useAuth from '@/hooks/useAuth';
import LoginModal from '@/components/common/modals/LoginModal';

export default function InfluencerItem({
  influencerId,
  influencerName,
  influencerImgUrl,
  influencerJob,
  likes,
}: InfluencerData) {
  const authInfo = useAuth();
  const location = useLocation();
  const [isLike, setIsLike] = useState(likes);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { mutate: postLike } = usePostInfluencerLike();
  const handleClickLike = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.preventDefault();
      if (!authInfo.accessToken) {
        setShowLoginModal(true);
        return;
      }
      const newLikeStatus = !isLike;
      postLike(
        { influencerId, likes: newLikeStatus },
        {
          onSuccess: () => {
            console.log('성공');
            setIsLike(newLikeStatus);
          },
          onError: (error) => {
            console.error('Error:', error);
            /* todo - 좋아요 실패시 띄울 컴포넌트 */
          },
        },
      );
    },
    [isLike, influencerId, postLike],
  );

  return (
    <>
      <Wrapper to={`/map?influencer=${encodeURIComponent(influencerName)}`}>
        <ImageContainer>
          <LikeIcon onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClickLike(e)}>
            {isLike ? <PiHeartFill color="#fe7373" size={32} /> : <PiHeartLight color="white" size={32} />}
          </LikeIcon>
          <FrontImage src={influencerImgUrl} alt={influencerName} />
          <BackImageWrapper>
            <MdLocationOn size={50} color="#55EBFF" />
            <Paragraph size="m" variant="white" weight="bold">
              지도 보기
            </Paragraph>
          </BackImageWrapper>
        </ImageContainer>
        <Paragraph size="m" weight="bold" variant="white">
          {influencerName}
        </Paragraph>
        <Paragraph size="xs" weight="normal" variant="white">
          {influencerJob}
        </Paragraph>
      </Wrapper>
      {showLoginModal && <LoginModal currentPath={location.pathname} onClose={() => setShowLoginModal(false)} />}
    </>
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
  margin-bottom: auto;

  &:hover {
    & > div:nth-child(2) {
      opacity: 0;
    }

    & > div:last-child {
      opacity: 1;
    }
  }
`;

const FrontImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 8px;
  border-radius: 6px;
  transition: opacity 0.6s ease-in-out;
`;

const BackImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url(${backCard});
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
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
