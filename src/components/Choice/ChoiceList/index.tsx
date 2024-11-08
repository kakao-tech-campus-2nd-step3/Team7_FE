import styled from 'styled-components';
import ChoiceItem from '@/components/common/Items/ChoiceItem';
import { InfluencerData } from '@/types';

interface ChoiceListProps {
  items: InfluencerData[];
  onToggleLike: (influencerId: number, isLiked: boolean) => void;
  selectedInfluencers: Set<number>;
}

export default function ChoiceList({ items, onToggleLike, selectedInfluencers }: ChoiceListProps) {
  return (
    <GridContainer>
      {items.map((influencer) => {
        return (
          <ChoiceItem
            key={influencer.influencerId}
            influencerId={influencer.influencerId}
            influencerName={influencer.influencerName}
            influencerImgUrl={influencer.influencerImgUrl}
            influencerJob={influencer.influencerJob}
            onToggleLike={onToggleLike}
            isSelected={selectedInfluencers.has(influencer.influencerId)}
          />
        );
      })}
    </GridContainer>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 26px;
`;
