import { AiFillLike, AiFillDislike } from 'react-icons/ai';

import styled from 'styled-components';

import { Paragraph } from '@/components/common/typography/Paragraph';

import BarGraph from './BarGraph';
import Review from './Review';
import { PlaceLikes, ReviewData } from '@/types';

export default function ReviewTap({ placeLikes, list }: { placeLikes: PlaceLikes; list: ReviewData[] }) {
  return (
    <Wrapper>
      <CountLike>
        <AiFillLike size={50} color="#fe7373" />
        <BarGraph like={placeLikes.like} dislike={placeLikes.dislike} />
        <AiFillDislike size={50} color="#6F6CFF" />
      </CountLike>
      <Paragraph size="m" weight="bold" variant="white">
        <span style={{ color: '#55EBFF' }}>리뷰</span> 한마디
      </Paragraph>
      <Review items={list} />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 30px 80px;
`;
const CountLike = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
`;
