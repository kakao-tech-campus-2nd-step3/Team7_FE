import { IoWifi } from 'react-icons/io5';
import { LuParkingCircle, LuParkingCircleOff } from 'react-icons/lu';
import { MdOutlinePets, MdSmokeFree, MdSmokingRooms } from 'react-icons/md';
import { TbDisabled } from 'react-icons/tb';

import styled from 'styled-components';

import { Paragraph } from '@/components/common/typography/Paragraph';

import { FacilityInfo } from '@/types';

export default function FacilitySign({ facilityInfo }: { facilityInfo: FacilityInfo }) {
  return (
    <Wrapper>
      {facilityInfo.wifi ? (
        <SignWrapper>
          <Sign>
            <IoWifi size={46} color="white" />
          </Sign>
          <Paragraph size="s" weight="normal" variant="white">
            WIFI
          </Paragraph>
        </SignWrapper>
      ) : null}
      <SignWrapper>
        {facilityInfo.parking ? (
          <LuParkingCircle size={70} color="white" strokeWidth={1} />
        ) : (
          <LuParkingCircleOff size={70} color="white" strokeWidth={1} />
        )}
        <Paragraph size="s" weight="normal" variant="white">
          주차
        </Paragraph>
      </SignWrapper>
      {facilityInfo.pet ? (
        <SignWrapper>
          <Sign>
            <MdOutlinePets size={46} color="white" />
          </Sign>
          <Paragraph size="s" weight="normal" variant="white">
            동물출입
          </Paragraph>
        </SignWrapper>
      ) : null}
      {facilityInfo.forDisabled ? (
        <SignWrapper>
          <Sign>
            <TbDisabled size={46} color="white" />
          </Sign>
          <Paragraph size="s" weight="normal" variant="white">
            휠체어사용
          </Paragraph>
        </SignWrapper>
      ) : null}
      <SignWrapper>
        <Sign>
          {facilityInfo.smokingRoom ? (
            <MdSmokingRooms size={46} color="white" />
          ) : (
            <MdSmokeFree size={46} color="white" />
          )}
        </Sign>
        <Paragraph size="s" weight="normal" variant="white">
          흡연실
        </Paragraph>
      </SignWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  display: flex;
  gap: 20px;
`;
const Sign = styled.div`
  border: 3px solid white;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  text-align: center;
  align-content: center;
  margin: 4px;
`;
const SignWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  align-items: center;
`;
