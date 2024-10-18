import styled from 'styled-components';

import { Paragraph } from '@/components/common/typography/Paragraph';

import { Menu } from '@/types';
import { Text } from '@/components/common/typography/Text';

export default function MenuList({ lists }: { lists: Menu[] }) {
  return (
    <Wrapper>
      {lists.map((list) => (
        <MenuItem key={list.menuName}>
          {list.menuImgUrl && <MenuIamge src={list.menuImgUrl} alt={list.menuName} />}
          <MenuContent>
            <Text size="s" weight="normal" variant="white">
              {list.menuName}
            </Text>
            {list.recommend && (
              <Text size="s" weight="bold" variant="mint">
                {` Pick !`}
              </Text>
            )}
            <Paragraph size="xs" weight="bold" variant="white">
              {Number(list.price).toLocaleString()}
            </Paragraph>
            <Paragraph size="xs" weight="normal" variant="white">
              {list.description}
            </Paragraph>
          </MenuContent>
        </MenuItem>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px 0px;
`;

const MenuItem = styled.div`
  padding-top: 30px;
  display: flex;
  gap: 14px;
`;

const MenuIamge = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10px;
`;
const MenuContent = styled.div`
  line-height: 140%;
`;
