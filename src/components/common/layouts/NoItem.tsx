import styled from 'styled-components';
import Logo from '@/assets/images/Logo.svg';
import { Paragraph } from '../typography/Paragraph';

interface NoItemsMessageProps {
  message?: string;
  height?: number;
}

function NoItem({ message = '데이터가 없습니다!', height }: NoItemsMessageProps) {
  return (
    <MessageContainer style={{ height }}>
      <TextWrapper>
        <LogoImage src={Logo} alt="인플레이스 로고" />
        <Paragraph size="m" weight="normal" variant="white">
          {message}
        </Paragraph>
      </TextWrapper>
    </MessageContainer>
  );
}

const MessageContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px 0;
  align-content: center;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  white-space: pre-line;
  line-height: 26px;
`;
const LogoImage = styled.img`
  height: 100px;
`;
export default NoItem;
