import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { Paragraph } from '@/components/common/typography/Paragraph';

import useExtractYoutubeVideoId from '@/libs/youtube/useExtractYoutube';
import { SpotData } from '@/types';

export default function SpotItem({ videoId, videoAlias, videoUrl, place }: SpotData) {
  return (
    <Wrapper to={`/detail/${place.placeId}`}>
      <Image
        src={`https://img.youtube.com/vi/${useExtractYoutubeVideoId(videoUrl)}/maxresdefault.jpg`}
        alt={String(videoId)}
      />
      <Paragraph size="m" weight="bold" variant="white">
        {videoAlias}
      </Paragraph>
      <Paragraph size="xs" weight="normal" variant="white">
        <FaMapMarkerAlt size={20} color="#55EBFF" />
        {place.placeName}
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
