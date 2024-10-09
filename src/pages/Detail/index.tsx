import { Suspense, useState } from 'react';
import { FaYoutube } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';

import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import Button from '@/components/common/Button';
import { Text } from '@/components/common/typography/Text';
import InfoTap from '@/components/features/Detail/InfoTap';
import ReviewTap from '@/components/features/Detail/ReviewTap';
import VisitModal from '@/components/features/Detail/VisitModal';

import useExtractYoutubeVideoId from '@/hooks/useExtractYoutube';
import { useGetPlaceInfo } from '@/api/hooks/useGetPlaceInfo';
import Loading from '@/components/common/layouts/Loading';

export default function DetailPage() {
  const [activeTab, setActiveTab] = useState<'info' | 'review'>('info');
  const [visitModal, setVisitModal] = useState(false);
  const { id } = useParams() as { id: string };
  const { data: infoData } = useGetPlaceInfo(id);
  return (
    <Wrapper>
      <Image
        src={`https://img.youtube.com/vi/${useExtractYoutubeVideoId(infoData.videoUrl)}/maxresdefault.jpg`}
        alt="장소사진"
      />
      <TitleContainer>
        <Text size="xl" weight="bold" variant="white">
          {infoData.placeName}
        </Text>
        <ButtonWrapper>
          <Button
            theme="visit"
            style={{
              width: '130px',
              height: '40px',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
            onClick={() => setVisitModal(!visitModal)}
          >
            <RiKakaoTalkFill size={26} color="yellow" />
            방문할래요
          </Button>
          <a href="https://www.youtube.com">
            <FaYoutube size={54} color="red" />
          </a>
        </ButtonWrapper>
      </TitleContainer>
      <TapContainer>
        <Tap $active={activeTab === 'info'} onClick={() => setActiveTab('info')}>
          정보
        </Tap>
        <Tap $active={activeTab === 'review'} onClick={() => setActiveTab('review')}>
          리뷰
        </Tap>
      </TapContainer>

      <InfoContainer>
        {activeTab === 'info' ? (
          <InfoTap facilityInfo={infoData.facilityInfo} openHour={infoData.openHour} menuInfos={infoData.menuInfos} />
        ) : (
          <Suspense fallback={<Loading size={50} />}>
            <ReviewTap placeLikes={infoData.placeLikes} id={id} />
          </Suspense>
        )}
      </InfoContainer>
      {visitModal ? <VisitModal placeName={infoData.placeName} setVisitModal={setVisitModal} /> : null}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 40px;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  aspect-ratio: 2 / 1;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Tap = styled.button<{ $active: boolean }>`
  width: 100%;
  height: 60px;
  font-size: 24px;
  font-weight: bold;
  color: ${({ $active }) => ($active ? '#55ebff' : 'white')};
  border: none;
  border-bottom: 3px solid ${({ $active }) => ($active ? '#55ebff' : 'white')};
  background: none;
  cursor: pointer;
  transition:
    color 0.3s ease,
    border-bottom 0.3s ease;
`;
const TapContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;
const InfoContainer = styled.div`
  padding-top: 20px;
`;
