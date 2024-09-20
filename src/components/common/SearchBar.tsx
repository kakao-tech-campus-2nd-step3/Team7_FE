import { useState } from 'react';

import styled from 'styled-components';

import { Text } from '@/components/common/typography/Text';

interface SearchBarProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ placeholder = '키워드를 입력해주세요!', onChange }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <SearchBarContainer>
      <SearchInputWrapper>
        {!inputValue && (
          <StyledText size="s" weight="normal" variant="grey">
            {placeholder}
          </StyledText>
        )}
        <SearchInput type="text" value={inputValue} onChange={handleInputChange} />
      </SearchInputWrapper>
      <SearchIconWrapper />
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 13.4118px;
  gap: 27.66px;
  width: 992.51px;
  height: 48px;
  background: #ffffff;
  border-radius: 16.7648px;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.125736px;
  color: #000;
  background: transparent;
  border: none;
  outline: none;
  z-index: 1;
  position: relative;
`;

const StyledText = styled(Text)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 0;
`;

const SearchIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  flex: none;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 12.5%;
    right: 14.62%;
    top: 12.5%;
    bottom: 14.63%;
    background-color: #55ebff;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z'/%3E%3C/svg%3E")
      center / contain no-repeat;
  }
`;