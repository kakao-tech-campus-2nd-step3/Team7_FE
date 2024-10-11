import styled from 'styled-components';

import { Paragraph } from '@/components/common/typography/Paragraph';

import { Menu } from '@/types';

export default function MenuList({ lists }: { lists: Menu[] }) {
  return (
    <Wrapper>
      {lists.map((list) => (
        <MenuItem key={list.menu}>
          <Paragraph size="s" weight="normal" variant="white">
            {list.menu}
          </Paragraph>
          <Paragraph size="xs" weight="bold" variant="white">
            {list.price}
          </Paragraph>
          <Paragraph size="xs" weight="normal" variant="white">
            {list.menu}
          </Paragraph>
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
  line-height: 140%;
`;
