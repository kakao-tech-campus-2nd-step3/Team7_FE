import { useState } from 'react';

import styled from 'styled-components';

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
        <SearchInput type="text" value={inputValue} onChange={handleInputChange} placeholder={placeholder} />
      </SearchInputWrapper>
      <SearchIconWrapper />
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  height: 43px;
  background: #414141;
  border-radius: 16px;
  padding: 0px 14px;
  margin-bottom: -20px;
`;

const SearchInputWrapper = styled.div`
  width: 100%;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  background: transparent;
  border: none;
  outline: none;
  z-index: 1;

  &::placeholder {
    color: #9b9b9b;
    font-weight: normal;
  }
`;

const SearchIconWrapper = styled.div`
  width: 20px;
  height: 20px;
  background-color: #55ebff;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z'/%3E%3C/svg%3E")
    center / contain no-repeat;
  cursor: pointer;
`;
