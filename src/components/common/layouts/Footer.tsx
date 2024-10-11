import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { RiKakaoTalkFill } from 'react-icons/ri';
import { FaInstagram, FaGithub } from 'react-icons/fa';
import { Text } from '@/components/common/typography/Text';

export default function Footer() {
  return (
    <FooterContainer>
      <FooterSection>
        <FooterNav>
          <NavItem to="/service">
            <Text size="xxs" weight="bold" variant="white">
              서비스 이용 약관
            </Text>
          </NavItem>
          <NavItem to="/privacy">
            <Text size="xxs" weight="bold" variant="white">
              개인정보 처리방침
            </Text>
          </NavItem>
          <NavItem to="/marketing">
            <Text size="xxs" weight="bold" variant="white">
              마케팅 수신 동의
            </Text>
          </NavItem>
          <NavItem to="/customer">
            <Text size="xxs" weight="bold" variant="white">
              고객센터
            </Text>
          </NavItem>
          <NavItem to="/business">
            <Text size="xxs" weight="bold" variant="white">
              비즈니스
            </Text>
          </NavItem>
        </FooterNav>
        <FooterInfo>
          <CompanyInfo>
            <Text size="xxs" weight="normal" variant="#979797">
              (주)방금 그곳
            </Text>
            <Text size="xxs" weight="normal" variant="#979797">
              Copyright 2024. banggeumgugot Co.,Ltd. All rights reserved
            </Text>
            <Text size="xxs" weight="normal" variant="#979797">
              주소 : 대구광역시 북구 대학로 80
            </Text>
            <Text size="xxs" weight="normal" variant="#979797">
              문의전화 : (053)123-12345 | 이메일 : abc@kakao.com
            </Text>
            <Text size="xxs" weight="normal" variant="#979797">
              대표전화 : (053)777-7777 | FAX : (053)123-4567
            </Text>
          </CompanyInfo>
          <SocialLinks>
            <SocialNavItem href="https://kakao.com" target="_blank" rel="noopener noreferrer">
              <RiKakaoTalkFill size={16} color="white" />
              <Text size="xxs" weight="normal" variant="white">
                카카오톡
              </Text>
            </SocialNavItem>
            <SocialNavItem href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={16} color="white" />
              <Text size="xxs" weight="normal" variant="white">
                인스타그램
              </Text>
            </SocialNavItem>
            <SocialNavItem href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub size={16} color="white" />
              <Text size="xxs" weight="normal" variant="white">
                깃허브
              </Text>
            </SocialNavItem>
          </SocialLinks>
        </FooterInfo>
      </FooterSection>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  background: #2f2f2f;
  width: 100%;
  padding: 30px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1080px;
`;

const FooterNav = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const FooterInfo = styled.div`
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
  align-items: flex-start;
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavItem = styled(Link)`
  font-family: 'Merriweather', sans-serif;
  line-height: 24px;
  text-decoration: none;
`;

const SocialNavItem = styled.a`
  line-height: 24px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
`;
