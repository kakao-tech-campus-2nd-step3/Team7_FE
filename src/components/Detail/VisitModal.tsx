import { FcInfo } from 'react-icons/fc';

import styled from 'styled-components';

import { useState } from 'react';
import Button from '@/components/common/Button';
import { Paragraph } from '@/components/common/typography/Paragraph';
import { useGetSendInfo } from '@/api/hooks/useGetSendInfo';

export default function VisitModal({ id, placeName, onClose }: { id: number; placeName: string; onClose: () => void }) {
  const { refetch } = useGetSendInfo(String(id));
  const [message, setMessage] = useState<string>('');

  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  const handleSendInfo = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      const response = await refetch();
      if (response.data.success) {
        setMessage('완료되었습니다.');
      }
    } catch (error) {
      console.error('실패: 정보를 보내는 데 실패했습니다.');
    }
  };
  return (
    <Overlay onClick={() => onClose()}>
      <Wrapper onClick={handleModalClick}>
        <DescriptionSection>
          <FcInfo size={180} />
          <Paragraph size="l" weight="normal">
            {message || `${placeName}에 대한 정보를\n 카카오톡으로 보내드릴까요?`}
          </Paragraph>
        </DescriptionSection>
        <BtnContainer hasMessage={message === '완료되었습니다.'}>
          {message === '완료되었습니다.' ? (
            <Button
              variant="kakao"
              style={{ fontWeight: 'bold', width: '170px', height: '46px', fontSize: '18px' }}
              onClick={() => onClose()}
            >
              완료
            </Button>
          ) : (
            <>
              <Button
                variant="blackOutline"
                style={{ fontWeight: 'bold', width: '170px', height: '46px', fontSize: '18px' }}
                onClick={() => onClose()}
              >
                취소
              </Button>
              <Button
                variant="kakao"
                style={{ fontWeight: 'bold', width: '170px', height: '46px', fontSize: '18px' }}
                onClick={handleSendInfo}
              >
                확인
              </Button>
            </>
          )}
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
    white-space: pre-line;
  }
`;
const BtnContainer = styled.div<{ hasMessage: boolean }>`
  display: flex;
  justify-content: ${({ hasMessage }) => (hasMessage ? 'center' : 'space-between')};
  width: 382px;
`;
