import styled from 'styled-components';

import InfluencerItem from './InfluencerItem';
import { InfluencerData } from '@/types';

export default function InfluencerSection({ items }: { items: InfluencerData[] }) {
  return (
    <ListContainer>
      {items.map((influencer) => {
        return (
          <InfluencerItem
            key={influencer.influencerId}
            influencerId={influencer.influencerId}
            influencerName={influencer.influencerName}
            influencerImgUrl={influencer.influencerImgUrl}
            influencerJob={influencer.influencerJob}
            likes={influencer.likes}
          />
        );
      })}
    </ListContainer>
  );
}
const ListContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 40px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
