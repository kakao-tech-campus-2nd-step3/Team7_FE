import styled from 'styled-components';

import { UserPlaceData } from '@/types';
import UserPlaceItem from './UserPlaceItem';

export default function UserPlaceSection({ items }: { items: UserPlaceData[] }) {
  return (
    <ListContainer>
      {items.map((place) => {
        return (
          <UserPlaceItem
            key={place.placeId}
            placeId={place.placeId}
            placeName={place.placeName}
            imageUrl={place.imageUrl}
            influencer={place.influencer}
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
