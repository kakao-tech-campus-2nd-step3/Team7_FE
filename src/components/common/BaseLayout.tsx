import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { Text } from '@/components/common/typography/Text';

import InfluencerSection from '@/components/Main/InfluencerSection';
import InfluencerList from '@/components/Influencer/InfluencerList';
import SpotSection from '@/components/Main/SpotSection';
import { InfluencerData, SpotData, UserPlaceData } from '@/types';
import UserPlaceSection from '@/components/My/UserPlaceSection';

type Props = {
  type: string;
  prevSubText?: string;
  mainText: string;
  SubText: string;
  items: InfluencerData[] | SpotData[] | UserPlaceData[];
  showMoreButton?: boolean;
  isChoice?: boolean;
};

export default function BaseLayout({
  type,
  prevSubText = '',
  mainText = '',
  SubText,
  items,
  showMoreButton = true,
  isChoice = false,
}: Props) {
  const navigate = useNavigate();

  const renderSection = () => {
    if (type === 'influencer' && showMoreButton === false) {
      if (isChoice) return <InfluencerList items={items as InfluencerData[]} useBackCard={false} useNav={false} />;
      return <InfluencerList items={items as InfluencerData[]} useBackCard={false} />;
    }
    if (type === 'influencer') {
      return <InfluencerSection items={items as InfluencerData[]} />;
    }
    if (type === 'spot') {
      return <SpotSection items={items as SpotData[]} />;
    }
    return <UserPlaceSection items={items as UserPlaceData[]} />;
  };
  return (
    <Container>
      <TitleContainer>
        <Text size="m" weight="bold">
          {prevSubText || ''}
          <Text size="28px" weight="bold" variant="mint">
            {mainText || ''}
          </Text>
          {SubText}
        </Text>
        {type === 'influencer' && showMoreButton ? (
          <MoreBtn onClick={() => navigate('/influencer')}>더보기</MoreBtn>
        ) : null}
      </TitleContainer>
      {renderSection()}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  color: white;
`;
const MoreBtn = styled.button`
  font-size: 14px;
  color: #b0b0b0;
  background: none;
  border: none;
  cursor: pointer;
`;
