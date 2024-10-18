import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

import styled from 'styled-components';

type ToggleButtonProps = {
  options: string[];
  onSelect: (selected: string[]) => void;
};

export default function ToggleButton({ options, onSelect }: ToggleButtonProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleClick = (option: string) => {
    let newSelectedOptions: string[];
    if (selectedOptions.includes(option)) {
      newSelectedOptions = selectedOptions.filter((item) => item !== option);
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(newSelectedOptions);
    onSelect(newSelectedOptions);
  };

  return (
    <ToggleButtonContainer>
      {options.map((option) => (
        <Button key={option} isActive={selectedOptions.includes(option)} onClick={() => handleClick(option)}>
          <ButtonText isActive={selectedOptions.includes(option)}>{option}</ButtonText>
          {selectedOptions.includes(option) && (
            <CheckIconWrapper>
              <FaCheck color="#FFFFFF" size={10} />
            </CheckIconWrapper>
          )}
        </Button>
      ))}
    </ToggleButtonContainer>
  );
}

const ToggleButtonContainer = styled.div`
  display: flex;
  gap: 14px;
  width: 320px;
  height: 40px;
`;

const Button = styled.button<{ isActive: boolean }>`
  position: relative;
  width: 100px;
  height: 40px;
  border: none;
  background: ${(props) => (props.isActive ? '#DBFBFF' : '#F9F9F9')};
  border-radius: 18px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${(props) => (props.isActive ? '#DBFBFF' : '#F0F0F0')};
  }
`;

const ButtonText = styled.span<{ isActive: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 700;
  font-size: 16px;
  color: ${(props) => (props.isActive ? '#004BFE' : '#202020')};
  ${(props) => (props.isActive ? 'left: 20%; right: 30%;' : 'left: 0px; right: 0px; text-align: center;')}
`;

const CheckIconWrapper = styled.div`
  position: absolute;
  left: 70%;
  right: 6%;
  top: 20%;
  bottom: 22%;
  background: #004cff;
  border: 2px solid #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
