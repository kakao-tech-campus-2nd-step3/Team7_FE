import styled from 'styled-components';

import { Text } from '@/components/common/typography/Text';

import { OpenHourData } from '@/types';

export default function OpenHour({ openHour }: { openHour: OpenHourData }) {
  return (
    <Wrapper>
      {openHour.periodList.map((list) => (
        <HourItem key={list.dayOfWeek}>
          <Text size="xs" weight="bold" variant="white">
            {list.dayOfWeek} :
          </Text>
          <Text size="xs" weight="normal" variant="white">
            {list.timeSE}
          </Text>
        </HourItem>
      ))}
      {openHour.offdayList.map((list) => (
        <OffItem key={list.weekAndDay}>
          <Text size="xs" weight="normal" variant="white">
            {list.holidayName}
          </Text>
          <Text size="xs" weight="bold" variant="white">
            {list.weekAndDay}
          </Text>
        </OffItem>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 10px 0px;
  padding: 20px;
`;

const HourItem = styled.div`
  display: flex;
  gap: 8px;
  line-height: 150%;
`;
const OffItem = styled.div`
  margin: 10px 0px;
  display: flex;
  gap: 8px;
  line-height: 150%;
`;
