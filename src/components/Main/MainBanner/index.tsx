import { useEffect, useState } from 'react';
import { GrPrevious, GrNext } from 'react-icons/gr';

import styled from 'styled-components';

import BannerItem from '@/components/Main/MainBanner/BannerItem';

import { BannerData } from '@/types';

export default function MainBanner({ items }: { items: BannerData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  const handleBtnPrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleBtnNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, items.length - 1));
  };
  return (
    <Container>
      <PrevBtn onClick={handleBtnPrevClick} disabled={currentIndex === 0}>
        <GrPrevious size={40} />
      </PrevBtn>
      <NextBtn onClick={handleBtnNextClick} disabled={currentIndex === items.length - 1}>
        <GrNext size={40} />
      </NextBtn>
      <CarouselWrapper>
        <CarouselContainer currentIndex={currentIndex}>
          {items.map((item) => (
            <BannerItem
              key={item.bannerId}
              bannerId={item.bannerId}
              placeId={item.placeId}
              description={item.description}
              bannerImg={item.bannerImg}
              title={item.title}
            />
          ))}
        </CarouselContainer>
      </CarouselWrapper>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const PrevBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  left: 10px;
  z-index: 1;
  color: white;
`;

const NextBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
  z-index: 1;
  color: white;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const CarouselContainer = styled.div<{ currentIndex: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
  width: 100%;
`;
