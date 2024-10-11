import { FcInfo } from 'react-icons/fc';

import styled from 'styled-components';

import Button from '@/components/common/Button';
import { Paragraph } from '@/components/common/typography/Paragraph';

export default function VisitModal({ placeName, onClose }: { placeName: string; onClose: () => void }) {
  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  return (
    <Overlay onClick={() => onClose()}>
      <Wrapper onClick={(e) => handleModalClick(e)}>
        <DescriptionSection>
          <FcInfo size={180} />
          <Paragraph size="l" weight="normal">
            {placeName}에 대한 정보를
            <br /> 카카오톡으로 보내드릴까요?
          </Paragraph>
        </DescriptionSection>
        <BtnContainer>
          <Button
            variant="blackOutline"
            style={{ fontWeight: 'bold', width: '170px', height: '46px', fontSize: '18px' }}
            onClick={() => onClose()}
          >
            취소
          </Button>
          <Button variant="kakao" style={{ fontWeight: 'bold', width: '170px', height: '46px', fontSize: '18px' }}>
            확인
          </Button>
        </BtnContainer>
      </Wrapper>
    </Overlay>
  );
}
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 600px;
  border-radius: 8px;
  background-color: white;

  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  gap: 60px;
`;
const DescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20%;
  p {
    line-height: 180%;
  }
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 382px;
`;
